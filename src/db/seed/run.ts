import { seedAdvocates } from './advocates';

async function main() {
  console.log('Starting database seed...');
  
  try {
    await seedAdvocates();
    console.log('Seed completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seed failed:', error);
    process.exit(1);
  }
}

main();
