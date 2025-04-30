import db from "../../../db/seed";
import { advocates } from "../../../db/schema";
import { SQL, ilike, or, count } from "drizzle-orm";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const searchTerm = searchParams.get('search') || '';
  const page = parseInt(searchParams.get('page') || '1');
  const pageSize = parseInt(searchParams.get('pageSize') || '10');
  
  const offset = (page - 1) * pageSize;
  
  let filterCondition: SQL | undefined;
  
  if (searchTerm) {
    filterCondition = or(
      ilike(advocates.firstName, `%${searchTerm}%`),
      ilike(advocates.lastName, `%${searchTerm}%`),
      ilike(advocates.city, `%${searchTerm}%`),
      ilike(advocates.degree, `%${searchTerm}%`)
    );
  }
  
  const countQuery = filterCondition 
    ? db.select({ count: count() }).from(advocates).where(filterCondition)
    : db.select({ count: count() }).from(advocates);
    
  const countResult = await countQuery;
  
  const totalCount = Number(countResult[0]?.count || 0);
  
  const dataQuery = filterCondition
    ? db.select().from(advocates).where(filterCondition).limit(pageSize).offset(offset)
    : db.select().from(advocates).limit(pageSize).offset(offset);
    
  const data = await dataQuery;
  
  return Response.json({
    data,
    pagination: {
      total: totalCount,
      page,
      pageSize,
      totalPages: Math.ceil(totalCount / pageSize)
    }
  });
}
