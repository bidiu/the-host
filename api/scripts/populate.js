/*
 * Use this script to quickly populate data into database.
 */

const venueService = require('../services/venue');

/**
 * Populate `venues` collection in database.
 */
async function populateVenues() {
  let venues = await venueService.index();

  // if already have data, don't populate more
  if (venues.length > 0) { return; }
  console.log('No document in `venues` collection, start populating.');

  await venueService.create({
    name: 'Starbucks - The popular Cafe you love',
    type: 'restaurant',
    about: `Etiam nisi enim, rhoncus vitae vestibulum in, ultricies vulputate tellus. \
Integer quis molestie justo. In id ante non metus ultricies vulputate non eget lorem. \
Ut sed lorem interdum, ornare odio at, placerat ante. Vestibulum fermentum nibh leo. \
Curabitur pulvinar lorem vitae enim luctus, quis mollis elit congue. Praesent commodo \
nibh a felis vestibulum egestas. Phasellus ac justo eu dui malesuada commodo ut vitae \
odio. Suspendisse risus ipsum, aliquet vitae sapien sed, interdum consectetur ligula. \
Nam lacinia eget velit id luctus. Sed tincidunt lacinia posuere. Proin in urna sed purus \
feugiat fringilla vitae non nunc. Mauris sit amet pulvinar dui. Nullam ac nisl lorem.`,
    phone: 1234567890,
    email: 'emailaddress@example.com',
    minCustomers: 1,
    maxCumsomers: 10,
    zip: 'K1G 3S2',
    address: '100 Trainyards Dr Unit 14A, Ottawa, ON',
    imgUrl: 'https://si.wsj.net/public/resources/images/P1-CE453_STARBU_M_20180521233141.jpg'
  });

  await venueService.create({
    name: 'Sugar Marmalade - Delicious food and deserts',
    type: 'restaurant',
    about: `Etiam nisi enim, rhoncus vitae vestibulum in, ultricies vulputate tellus. \
Integer quis molestie justo. In id ante non metus ultricies vulputate non eget lorem. \
Ut sed lorem interdum, ornare odio at, placerat ante. Vestibulum fermentum nibh leo. \
Curabitur pulvinar lorem vitae enim luctus, quis mollis elit congue. Praesent commodo \
nibh a felis vestibulum egestas. Phasellus ac justo eu dui malesuada commodo ut vitae \
odio. Suspendisse risus ipsum, aliquet vitae sapien sed, interdum consectetur ligula. \
Nam lacinia eget velit id luctus. Sed tincidunt lacinia posuere. Proin in urna sed purus \
feugiat fringilla vitae non nunc. Mauris sit amet pulvinar dui. Nullam ac nisl lorem.`,
    phone: 1234567890,
    email: 'emailaddress@example.com',
    minCustomers: 1,
    maxCumsomers: 10,
    zip: 'K1N 5X6',
    address: '180 Rideau St, Ottawa, ON',
    imgUrl: 'https://lh3.googleusercontent.com/p/AF1QipNVyIdmXZBg1ymUDjyx66_I0hBZm8j6Ih6yHY1D=s0'
  });

  await venueService.create({
    name: 'Oz Kafe, ByWard Market - Intimate space for dinner',
    type: 'restaurant',
    about: `Etiam nisi enim, rhoncus vitae vestibulum in, ultricies vulputate tellus. \
Integer quis molestie justo. In id ante non metus ultricies vulputate non eget lorem. \
Ut sed lorem interdum, ornare odio at, placerat ante. Vestibulum fermentum nibh leo. \
Curabitur pulvinar lorem vitae enim luctus, quis mollis elit congue. Praesent commodo \
nibh a felis vestibulum egestas. Phasellus ac justo eu dui malesuada commodo ut vitae \
odio. Suspendisse risus ipsum, aliquet vitae sapien sed, interdum consectetur ligula. \
Nam lacinia eget velit id luctus. Sed tincidunt lacinia posuere. Proin in urna sed purus \
feugiat fringilla vitae non nunc. Mauris sit amet pulvinar dui. Nullam ac nisl lorem.`,
    phone: 1234567890,
    email: 'emailaddress@example.com',
    minCustomers: 1,
    maxCumsomers: 8,
    zip: 'K1N 5S6',
    address: '10 York St, Ottawa, ON',
    imgUrl: 'https://lh3.googleusercontent.com/p/AF1QipM9T5hznpQgpBP-1TCI2CCDn7SjMAyHfNHyy1kM=s0'
  });


  await venueService.create({
    name: 'Walmart',
    type: 'supermarket',
    about: `Etiam nisi enim, rhoncus vitae vestibulum in, ultricies vulputate tellus. \
Integer quis molestie justo. In id ante non metus ultricies vulputate non eget lorem. \
Ut sed lorem interdum, ornare odio at, placerat ante. Vestibulum fermentum nibh leo. \
Curabitur pulvinar lorem vitae enim luctus, quis mollis elit congue. Praesent commodo \
nibh a felis vestibulum egestas. Phasellus ac justo eu dui malesuada commodo ut vitae \
odio. Suspendisse risus ipsum, aliquet vitae sapien sed, interdum consectetur ligula. \
Nam lacinia eget velit id luctus. Sed tincidunt lacinia posuere. Proin in urna sed purus \
feugiat fringilla vitae non nunc. Mauris sit amet pulvinar dui. Nullam ac nisl lorem.`,
    phone: 1234567890,
    email: 'emailaddress@example.com',
    minCustomers: 1,
    maxCumsomers: 8,
    zip: 'K1N 5S6',
    address: '10 York St, Ottawa, ON',
    imgUrl: 'https://lh3.googleusercontent.com/p/AF1QipPXe6R0Xgjvvzost6HADNKr2CfSFc-O5J3smKGx=s0'
  });

  await venueService.create({
    name: 'Metro',
    type: 'supermarket',
    about: `Etiam nisi enim, rhoncus vitae vestibulum in, ultricies vulputate tellus. \
Integer quis molestie justo. In id ante non metus ultricies vulputate non eget lorem. \
Ut sed lorem interdum, ornare odio at, placerat ante. Vestibulum fermentum nibh leo. \
Curabitur pulvinar lorem vitae enim luctus, quis mollis elit congue. Praesent commodo \
nibh a felis vestibulum egestas. Phasellus ac justo eu dui malesuada commodo ut vitae \
odio. Suspendisse risus ipsum, aliquet vitae sapien sed, interdum consectetur ligula. \
Nam lacinia eget velit id luctus. Sed tincidunt lacinia posuere. Proin in urna sed purus \
feugiat fringilla vitae non nunc. Mauris sit amet pulvinar dui. Nullam ac nisl lorem.`,
    phone: 1234567890,
    email: 'emailaddress@example.com',
    minCustomers: 1,
    maxCumsomers: 8,
    zip: 'K1N 5S6',
    address: '10 York St, Ottawa, ON',
    imgUrl: 'https://lh3.googleusercontent.com/p/AF1QipMmP6EIfVYW7zI42Z1ti2O5Y4vAqJFiSm0cjvWD=s0'
  });

  await venueService.create({
    name: 'KTV',
    type: 'entertainment',
    about: `Etiam nisi enim, rhoncus vitae vestibulum in, ultricies vulputate tellus. \
Integer quis molestie justo. In id ante non metus ultricies vulputate non eget lorem. \
Ut sed lorem interdum, ornare odio at, placerat ante. Vestibulum fermentum nibh leo. \
Curabitur pulvinar lorem vitae enim luctus, quis mollis elit congue. Praesent commodo \
nibh a felis vestibulum egestas. Phasellus ac justo eu dui malesuada commodo ut vitae \
odio. Suspendisse risus ipsum, aliquet vitae sapien sed, interdum consectetur ligula. \
Nam lacinia eget velit id luctus. Sed tincidunt lacinia posuere. Proin in urna sed purus \
feugiat fringilla vitae non nunc. Mauris sit amet pulvinar dui. Nullam ac nisl lorem.`,
    phone: 1234567890,
    email: 'emailaddress@example.com',
    minCustomers: 1,
    maxCumsomers: 8,
    zip: 'K1N 5S6',
    address: '10 York St, Ottawa, ON',
    imgUrl: 'https://lh3.googleusercontent.com/p/AF1QipOrcLYGJiwnJTouMcxWYSxgheqxu1VY4B6bG7j9=s0'
  });

  await venueService.create({
    name: 'Concert',
    type: 'entertainment',
    about: `Etiam nisi enim, rhoncus vitae vestibulum in, ultricies vulputate tellus. \
Integer quis molestie justo. In id ante non metus ultricies vulputate non eget lorem. \
Ut sed lorem interdum, ornare odio at, placerat ante. Vestibulum fermentum nibh leo. \
Curabitur pulvinar lorem vitae enim luctus, quis mollis elit congue. Praesent commodo \
nibh a felis vestibulum egestas. Phasellus ac justo eu dui malesuada commodo ut vitae \
odio. Suspendisse risus ipsum, aliquet vitae sapien sed, interdum consectetur ligula. \
Nam lacinia eget velit id luctus. Sed tincidunt lacinia posuere. Proin in urna sed purus \
feugiat fringilla vitae non nunc. Mauris sit amet pulvinar dui. Nullam ac nisl lorem.`,
    phone: 1234567890,
    email: 'emailaddress@example.com',
    minCustomers: 1,
    maxCumsomers: 8,
    zip: 'K1N 5S6',
    address: '10 York St, Ottawa, ON',
    imgUrl: 'https://lh3.googleusercontent.com/p/AF1QipOP2LPQGycU2QUc9vh04ZWlT7fdmm-MpTQJ67br=s0'
  });
}

async function populate() {
  try {
    await populateVenues();

  } catch (err) {
    console.error('Error while pupulating documents to MongoDB. Reason:\n', err);
  }
}

populate();
