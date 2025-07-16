// Mock data for when Contentful is not available
export const mockData = {
  getAllPeople: () => ({
    total: 6,
    skip: 0,
    limit: 100,
    items: [
      {
        sys: { id: 'person1', contentType: { sys: { id: 'person' } } },
        fields: {
          name: 'Albert Einstein',
          slug: 'albert-einstein',
          tagline: 'Theoretical physicist and philosopher of science',
          biography: {
            nodeType: 'document',
            content: [{
              nodeType: 'paragraph',
              content: [{
                nodeType: 'text',
                value: 'Albert Einstein was a German-born theoretical physicist who is widely held to be one of the greatest and most influential scientists of all time.'
              }]
            }]
          },
          category: { fields: { name: 'Scientists', slug: 'scientists', icon: '🔬', color: '#4F46E5' } },
          achievements: ['Nobel Prize in Physics (1921)', 'Theory of Relativity', 'Mass-energy equivalence (E=mc²)'],
          featured: true,
          viewCount: 1250,
          birthDate: '1879-03-14',
          deathDate: '1955-04-18',
          nationality: 'German',
          occupation: ['Theoretical Physicist', 'Philosopher'],
          keywords: ['relativity', 'physics', 'quantum', 'Nobel Prize']
        }
      },
      {
        sys: { id: 'person2', contentType: { sys: { id: 'person' } } },
        fields: {
          name: 'Marie Curie',
          slug: 'marie-curie',
          tagline: 'Pioneering researcher on radioactivity',
          biography: {
            nodeType: 'document',
            content: [{
              nodeType: 'paragraph',
              content: [{
                nodeType: 'text',
                value: 'Marie Curie was a Polish and naturalized-French physicist and chemist who conducted pioneering research on radioactivity.'
              }]
            }]
          },
          category: { fields: { name: 'Scientists', slug: 'scientists', icon: '🔬', color: '#4F46E5' } },
          achievements: ['First woman to win a Nobel Prize', 'First person to win Nobel Prizes in two different sciences', 'Discovery of radium and polonium'],
          featured: true,
          viewCount: 980,
          birthDate: '1867-11-07',
          deathDate: '1934-07-04',
          nationality: 'Polish-French',
          occupation: ['Physicist', 'Chemist'],
          keywords: ['radioactivity', 'Nobel Prize', 'radium', 'chemistry']
        }
      },
      {
        sys: { id: 'person3', contentType: { sys: { id: 'person' } } },
        fields: {
          name: 'Leonardo da Vinci',
          slug: 'leonardo-da-vinci',
          tagline: 'Renaissance polymath and artist',
          biography: {
            nodeType: 'document',
            content: [{
              nodeType: 'paragraph',
              content: [{
                nodeType: 'text',
                value: 'Leonardo da Vinci was an Italian polymath of the High Renaissance who was active as a painter, draughtsman, engineer, scientist, theorist, sculptor, and architect.'
              }]
            }]
          },
          category: { fields: { name: 'Artists', slug: 'artists', icon: '🎨', color: '#DC2626' } },
          achievements: ['The Mona Lisa', 'The Last Supper', 'Vitruvian Man', 'Flying machine designs'],
          featured: true,
          viewCount: 1500,
          birthDate: '1452-04-15',
          deathDate: '1519-05-02',
          nationality: 'Italian',
          occupation: ['Artist', 'Inventor', 'Scientist'],
          keywords: ['Renaissance', 'painting', 'invention', 'art']
        }
      },
      {
        sys: { id: 'person4', contentType: { sys: { id: 'person' } } },
        fields: {
          name: 'Frida Kahlo',
          slug: 'frida-kahlo',
          tagline: 'Mexican painter known for self-portraits',
          biography: {
            nodeType: 'document',
            content: [{
              nodeType: 'paragraph',
              content: [{
                nodeType: 'text',
                value: 'Frida Kahlo was a Mexican painter known for her many portraits, self-portraits, and works inspired by the nature and artifacts of Mexico.'
              }]
            }]
          },
          category: { fields: { name: 'Artists', slug: 'artists', icon: '🎨', color: '#DC2626' } },
          achievements: ['Self-Portrait with Thorn Necklace and Hummingbird', 'The Two Fridas', 'Diego and I'],
          featured: false,
          viewCount: 750,
          birthDate: '1907-07-06',
          deathDate: '1954-07-13',
          nationality: 'Mexican',
          occupation: ['Painter'],
          keywords: ['self-portrait', 'Mexican art', 'surrealism']
        }
      },
      {
        sys: { id: 'person5', contentType: { sys: { id: 'person' } } },
        fields: {
          name: 'Nelson Mandela',
          slug: 'nelson-mandela',
          tagline: 'Anti-apartheid activist and former President of South Africa',
          biography: {
            nodeType: 'document',
            content: [{
              nodeType: 'paragraph',
              content: [{
                nodeType: 'text',
                value: 'Nelson Mandela was a South African anti-apartheid activist who served as the first president of South Africa from 1994 to 1999.'
              }]
            }]
          },
          category: { fields: { name: 'Leaders', slug: 'leaders', icon: '👑', color: '#059669' } },
          achievements: ['Nobel Peace Prize (1993)', 'First Black President of South Africa', 'Ended apartheid'],
          featured: true,
          viewCount: 2100,
          birthDate: '1918-07-18',
          deathDate: '2013-12-05',
          nationality: 'South African',
          occupation: ['Activist', 'Politician', 'President'],
          keywords: ['apartheid', 'peace', 'freedom', 'justice']
        }
      },
      {
        sys: { id: 'person6', contentType: { sys: { id: 'person' } } },
        fields: {
          name: 'Stephen Hawking',
          slug: 'stephen-hawking',
          tagline: 'Theoretical physicist and cosmologist',
          biography: {
            nodeType: 'document',
            content: [{
              nodeType: 'paragraph',
              content: [{
                nodeType: 'text',
                value: 'Stephen Hawking was an English theoretical physicist, cosmologist, and author who was director of research at the Centre for Theoretical Cosmology.'
              }]
            }]
          },
          category: { fields: { name: 'Scientists', slug: 'scientists', icon: '🔬', color: '#4F46E5' } },
          achievements: ['A Brief History of Time', 'Hawking radiation theory', 'Black hole research'],
          featured: false,
          viewCount: 890,
          birthDate: '1942-01-08',
          deathDate: '2018-03-14',
          nationality: 'British',
          occupation: ['Theoretical Physicist', 'Cosmologist', 'Author'],
          keywords: ['black holes', 'cosmology', 'theoretical physics']
        }
      }
    ]
  }),

  getPersonBySlug: (slug: string) => {
    const allPeople = mockData.getAllPeople();
    return allPeople.items.find(person => person.fields.slug === slug) || null;
  },

  getAllCategories: () => ({
    total: 3,
    skip: 0,
    limit: 100,
    items: [
      {
        sys: { id: 'cat1', contentType: { sys: { id: 'category' } } },
        fields: {
          name: 'Scientists',
          slug: 'scientists',
          description: 'Pioneering minds in science and research',
          icon: '🔬',
          color: '#4F46E5',
          count: 3
        }
      },
      {
        sys: { id: 'cat2', contentType: { sys: { id: 'category' } } },
        fields: {
          name: 'Artists',
          slug: 'artists',
          description: 'Creative visionaries and artists',
          icon: '🎨',
          color: '#DC2626',
          count: 2
        }
      },
      {
        sys: { id: 'cat3', contentType: { sys: { id: 'category' } } },
        fields: {
          name: 'Leaders',
          slug: 'leaders',
          description: 'Influential leaders and changemakers',
          icon: '👑',
          color: '#059669',
          count: 1
        }
      }
    ]
  }),

  getCategoryBySlug: (slug: string) => {
    const allCategories = mockData.getAllCategories();
    return allCategories.items.find(category => category.fields.slug === slug) || null;
  },

  getPeopleByCategory: (categorySlug: string) => {
    const allPeople = mockData.getAllPeople();
    const peopleInCategory = allPeople.items.filter(person => 
      person.fields.category?.fields?.slug === categorySlug
    );

    return {
      total: peopleInCategory.length,
      skip: 0,
      limit: 100,
      items: peopleInCategory
    };
  },

  searchPeople: (query: string) => {
    const searchTerm = query.toLowerCase();
    const allPeople = mockData.getAllPeople();
    const results = allPeople.items.filter(person => {
      const name = person.fields.name || '';
      const tagline = person.fields.tagline || '';
      const keywords = person.fields.keywords || [];
      
      return name.toLowerCase().includes(searchTerm) ||
        tagline.toLowerCase().includes(searchTerm) ||
        (Array.isArray(keywords) && keywords.some((keyword: string) => 
          keyword.toLowerCase().includes(searchTerm)
        ));
    });

    return {
      total: results.length,
      skip: 0,
      limit: 100,
      items: results
    };
  },

  getFeaturedPeople: (limit: number = 6) => {
    const allPeople = mockData.getAllPeople();
    const featured = allPeople.items.filter(person => person.fields.featured);
    const limitedResults = featured.slice(0, limit);

    return {
      total: featured.length,
      skip: 0,
      limit,
      items: limitedResults
    };
  }
};