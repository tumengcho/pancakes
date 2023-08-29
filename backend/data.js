import bcrypt from 'bcryptjs';

const data = {
  users: [
    {
      name: 'Nicolas Valdes',
      email: 'nico@test.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: true,
    },
  ],
  products: [
    {
      name: 'Jordan 4s Military',
      slug: 'retro4-military',
      price: 240.0,
      description: 'The basic package with only 1 video that last 30 - 60secs.',
      image: '/Images/jordan4',
      category: 'shoes',
      vedette: true,
    },
    {
      name: 'Nike Air Max Plus',
      slug: 'nike-air-max-plus',
      price: 175.0,
      description: 'The basic package with only 1 video that last 30 - 60secs.',
      image: '/Images/tn',
      category: 'shoes',
      vedette: true,
    },
    {
      name: 'Yeezy Boost 700 V1',
      slug: 'yeezy-boost-700-V1',
      price: 220.0,
      description: 'The basic package with only 1 video that last 30 - 60secs.',
      image: '/Images/yeezy700',
      category: 'shoes',
      vedette: true,
    },
    {
      name: 'Nike Air Jordan 1',
      slug: 'nike-air-jordan-1',
      price: 220.0,
      description: 'The basic package with only 1 video that last 30 - 60secs.',
      image: '/Images/aj1',
      category: 'shoes',
      vedette: true,
    },
    {
      name: 'Nike Tech Fleece Blanc',
      slug: 'nike-tech-fleece-blanc',
      price: 200.0,
      description: 'The basic package with only 1 video that last 30 - 60secs.',
      image: '/Images/nt-white',
      category: 'clothes',
      vedette: true,
    },
    {
      name: 'Nike Tech Fleece Marin',
      slug: 'nike-tech-fleece-marin',
      price: 200.0,
      description: 'The basic package with only 1 video that last 30 - 60secs.',
      image: '/Images/nt-blue',
      category: 'clothes',
      vedette: true,
    },
    {
      name: 'Nike Tech Fleece Gris',
      slug: 'nike-tech-fleece-gris',
      price: 200.0,
      description: 'The basic package with only 1 video that last 30 - 60secs.',
      image: '/Images/nt-black',
      category: 'clothes',
      vedette: true,
    },
    {
      name: 'Survetement X Drake',
      slug: 'survet-x-drake',
      price: 200.0,
      description: 'The basic package with only 1 video that last 30 - 60secs.',
      image: '/Images/x-surv',
      category: 'clothes',
      vedette: true,
    },
  ],
};

export default data;
