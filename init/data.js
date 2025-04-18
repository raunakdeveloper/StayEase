const sampleListing = [
  {
    title: "Spider Plant Baby",
    description: "A beautiful, easy-to-care-for houseplant that thrives in indirect light.",
    image: {
      filename: "spider-plant.jpg",
      url: "https://images.unsplash.com/photo-1668117653442-dd03862e957f?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
    },
    location: "Brooklyn, NY",
    country: "USA",
    status: "Available",
    offerType: "Free",
    price: 0,
    careLevel: "Easy",
    lightNeeds: "Medium",

  },
  {
    title: "Rare Monstera Cutting",
    description: "A rare cutting of the Monstera plant, perfect for plant lovers looking to grow their own.",
    image: {
      filename: "monstera-cutting.jpg",
      url: "https://media.istockphoto.com/id/1302349234/photo/plant-care-pothos-damaged-leaf-removal.webp?s=1024x1024&w=is&k=20&c=NcZjCWrCKv4bgvyZBGGDAAePkU60rHd98fu3MvIy43A=", 
    },
    location: "Los Angeles, CA",
    country: "USA",
    status: "Available",
    offerType: "Sale",
    price: 15,
    careLevel: "Medium",
    lightNeeds: "High",

  },
  {
    title: "Peace Lily",
    description: "A lovely peace lily that is known for its beautiful white flowers and air-purifying qualities.",
    image: {
      filename: "peace-lily.jpg",
      url: "https://media.istockphoto.com/id/1272284700/photo/peace-lily-spathiphyllum-spp-houseplant-growing-in-clay-pot-on-bathroom-windowsill.webp?a=1&b=1&s=612x612&w=0&k=20&c=gM66f7B8AzySOLV2r-y1n-43My6_Z8cf1LdKuCoJOz0=",
    },
    location: "Miami, FL",
    country: "USA",
    status: "Swapped",
    offerType: "Swap",
    price: 0,
    careLevel: "Medium",
    lightNeeds: "Low",

  },
  {
    title: "Aloe Vera",
    description: "Aloe Vera plant, great for its soothing properties and easy maintenance.",
    image: {
      filename: "aloe-vera.jpg",
      url: "https://media.istockphoto.com/id/1220117733/photo/aloe-vera-plant-in-bathroom.webp?a=1&b=1&s=612x612&w=0&k=20&c=IvIAnRXrK51YjuWnGhRO5dFrDL4sILkdwZ51Ye2Y7EU=",
    },
    location: "Chicago, IL",
    country: "USA",
    status: "Available",
    offerType: "Free",
    price: 0,
    careLevel: "Easy",
    lightNeeds: "High",

  },
  {
    title: "Cactus (Opuntia)",
    description: "A hardy cactus with unique flat pads. Needs very little water and loves full sun.",
    image: {
      filename: "cactus-opuntia.jpg",
      url: "https://plus.unsplash.com/premium_photo-1733248812856-971b4dbb4614?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Q2FjdHVzJTIwKE9wdW50aWEpfGVufDB8fDB8fHww",
    },
    location: "Phoenix, AZ",
    country: "USA",
    status: "Available",
    offerType: "Swap",
    price: 0,
    careLevel: "Hard",
    lightNeeds: "High",

  },
  {
    title: "Fiddle Leaf Fig",
    description: "A popular statement plant with large, glossy leaves. Perfect for bright spaces.",
    image: {
      filename: "fiddle-leaf-fig.jpg",
      url: "https://images.unsplash.com/photo-1545239705-1564e58b9e4a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8RmlkZGxlJTIwTGVhZiUyMEZpZ3xlbnwwfHwwfHx8MA%3D%3D",
    },
    location: "San Francisco, CA",
    country: "USA",
    status: "Available",
    offerType: "Sale",
    price: 40,
    careLevel: "Medium",
    lightNeeds: "High"

  },
  {
    title: "Bamboo Palm",
    description: "A beautiful, easy-to-grow indoor plant that brings greenery to your home or office.",
    image: {
      filename: "bamboo-palm.jpg",
      url: "https://plus.unsplash.com/premium_photo-1672998073271-60d5ec1f8675?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8QmFtYm9vJTIwUGFsbSUyMGluJTIwcG90fGVufDB8fDB8fHww", 
    },
    location: "Dallas, TX",
    country: "USA",
    status: "Available",
    offerType: "Free",
    price: 0,
    careLevel: "Easy",
    lightNeeds: "Low",

  },
  {
    title: "Snake Plant",
    description: "Known for its ability to purify the air and its resistance to neglect. A must-have for beginner plant parents.",
    image: {
      filename: "snake-plant.jpg",
      url: "https://images.unsplash.com/photo-1616961162823-aeba510620c6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c25ha2UlMjBwbGFudCUyMGluJTIwcG90fGVufDB8fDB8fHww", 
    },
    location: "Austin, TX",
    country: "USA",
    status: "Available",
    offerType: "Sale",
    price: 10,
    careLevel: "Easy",
    lightNeeds: "Medium",

  },
  {
    title: "Philodendron",
    description: "A fast-growing, low-maintenance vine plant. Its heart-shaped leaves make it an attractive choice for any room.",
    image: {
      filename: "philodendron.jpg",
      url: "https://images.unsplash.com/photo-1647156123948-7323f3cee367?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8UGhpbG9kZW5kcm9uJTIwaW4lMjBwb3R8ZW58MHx8MHx8fDA%3D", 
    },
    location: "New York, NY",
    country: "USA",
    status: "Pending",
    offerType: "Swap",
    price: 0,
    careLevel: "Medium",
    lightNeeds: "Medium",

  },
  {
    title: "ZZ Plant",
    description: "A resilient and easy-to-care-for plant that thrives in low light and can go without water for weeks.",
    image: {
      filename: "zz-plant.jpg",
      url: "https://images.unsplash.com/photo-1632207691143-643e2a9a9361?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8enolMjBwbGFudCUyMGluJTIwcG90fGVufDB8fDB8fHww", 
    },
    location: "Seattle, WA",
    country: "USA",
    status: "Available",
    offerType: "Sale",
    price: 25,
    careLevel: "Easy",
    lightNeeds: "Low",

  },
  {
    title: "English Ivy",
    description: "A trailing vine that grows quickly and is perfect for creating a lush, green wall or hanging basket.",
    image: {
      filename: "english-ivy.jpg",
      url: "https://images.unsplash.com/photo-1669092650911-f071fa7dd295?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8RW5nbGlzaCUyMEl2eSUyMHBsYW50JTIwaW4lMjBwb3R8ZW58MHx8MHx8fDA%3D", 
    },
    location: "San Diego, CA",
    country: "USA",
    status: "Available",
    offerType: "Swap",
    price: 0,
    careLevel: "Medium",
    lightNeeds: "Medium",

  },
  {
    title: "Lavender Plant",
    description: "A fragrant herb known for its calming properties and beautiful purple flowers. Perfect for indoor or outdoor spaces.",
    image: {
      filename: "lavender.jpg",
      url: "https://images.unsplash.com/photo-1565011523534-747a8601f10a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8TGF2ZW5kZXIlMjBQbGFudCUyMGluJTIwcG90fGVufDB8fDB8fHww", 
    },
    location: "Portland, OR",
    price: 0,
    careLevel: "Medium",
    lightNeeds: "High",

  },
  {
    title: "Orchid",
    description: "An elegant plant with exotic flowers. Needs a little more care but worth it for the stunning blossoms.",
    image: {
      filename: "orchid.jpg",
      url: "https://images.unsplash.com/photo-1626359343178-bed3caddba4b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8T3JjaGlkJTIwUGxhbnQlMjBpbiUyMHBvdHxlbnwwfHwwfHx8MA%3D%3D", 
    },
    location: "Los Angeles, CA",
    country: "USA",
    status: "Available",
    offerType: "Sale",
    price: 20,
    careLevel: "Hard",
    lightNeeds: "Medium",
  },
  {
    title: "Citrus Tree (Lemon)",
    description: "Grow your own fresh lemons at home! Requires a bit more care but provides beautiful, fragrant flowers and fruit.",
    image: {
      filename: "citrus-tree.jpg",
      url: "https://plus.unsplash.com/premium_photo-1670274606916-6628a3d106a5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Q2l0cnVzJTIwVHJlZSUyMChMZW1vbiklMjBwbGFudCUyMCUyMGluJTIwcG90fGVufDB8fDB8fHww", 
    },
    location: "Tucson, AZ",
    country: "USA",
    status: "Available",
    offerType: "Free",
    price: 0,
    careLevel: "Medium",
    lightNeeds: "High",
  },
];

module.exports = { data: sampleListing };