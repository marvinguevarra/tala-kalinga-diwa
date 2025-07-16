import { ProfilePage } from "@/components/profile-page";

// Mock profile data for demonstration
const mockProfileData = {
  id: "1",
  name: "Dr. José Rizal",
  slug: "jose-rizal",
  tagline: "National hero, writer, and polymath who inspired Philippine independence through his literary works and revolutionary ideals",
  category: "Historical Figures",
  image_url: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&h=1000&fit=crop&crop=face",
  birthplace: "Calamba, Laguna, Philippines",
  birth_year: 1861,
  current_location: "Manila, Philippines (Historical)",
  biography: `José Protasio Rizal Mercado y Alonso Realonda was a Filipino nationalist, writer and polymath active at the end of the Spanish colonial period of the Philippines. He is considered the national hero of the Philippines.

An ophthalmologist by profession, Rizal became a writer and a key member of the Filipino Propaganda Movement, which advocated political reforms for the colony under Spain. He was executed by the Spanish colonial government for the crime of rebellion after the Philippine Revolution, inspired in part by his writings, broke out.

Though he never advocated or supported violent revolution, Rizal fought for the rights of Filipinos and the independence of the Philippines through his writing. His novels, essays and articles, written in both Spanish and Tagalog, exposed the abuses of the Spanish colonial rule and inspired a new sense of national identity among Filipinos.

Rizal was not only a political figure but also a Renaissance man, skilled in poetry, philosophy, linguistics, and science. He spoke 22 languages and was proficient in both the sciences and the arts. His intellectual prowess and moral courage made him a beacon of hope for the Filipino people during one of the darkest periods in their history.`,
  achievements: [
    {
      year: 1887,
      title: "Published Noli Me Tangere",
      description: "His first novel exposed the corruption and abuse of Spanish colonial rule, igniting Filipino consciousness for reform and independence."
    },
    {
      year: 1891,
      title: "Completed El Filibusterismo",
      description: "His second novel continued the themes of social injustice and served as a sequel to Noli Me Tangere, further inspiring revolutionary sentiment."
    },
    {
      year: 1892,
      title: "Founded La Liga Filipina",
      description: "Established a peaceful reform organization aimed at uniting Filipinos and advocating for political and social reforms."
    },
    {
      year: 1896,
      title: "Martyrdom and Execution",
      description: "Executed by Spanish authorities, becoming a martyr whose death sparked the Philippine Revolution and the fight for independence."
    }
  ],
  gallery_images: [
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=400&fit=crop"
  ],
  social_links: {
    website: "https://jose-rizal-foundation.org",
    facebook: "https://facebook.com/joserizalofficial",
    twitter: "https://twitter.com/joserizal"
  },
  coordinates: {
    lat: 14.2158,
    lng: 121.1600
  }
};

const mockRelatedProfiles = [
  {
    id: "2",
    name: "Andrés Bonifacio",
    slug: "andres-bonifacio",
    tagline: "Father of the Philippine Revolution and founder of the Katipunan",
    category: "Historical Figures",
    image_url: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=500&fit=crop&crop=face",
    birthplace: "Manila, Philippines",
    birth_year: 1863,
    current_location: "Manila, Philippines (Historical)",
    biography: "Revolutionary leader who founded the secret society Katipunan...",
    achievements: [
      {
        year: 1892,
        title: "Founded Katipunan",
        description: "Established the secret revolutionary society that would lead the Philippine Revolution."
      }
    ],
    gallery_images: [],
    social_links: {},
  },
  {
    id: "3", 
    name: "Emilio Aguinaldo",
    slug: "emilio-aguinaldo",
    tagline: "First President of the Philippines and leader during the Revolution",
    category: "Historical Figures",
    image_url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=500&fit=crop&crop=face",
    birthplace: "Cavite, Philippines",
    birth_year: 1869,
    current_location: "Cavite, Philippines (Historical)",
    biography: "Military leader and politician who became the first president...",
    achievements: [
      {
        year: 1898,
        title: "Declared Philippine Independence",
        description: "Proclaimed Philippine independence from Spanish rule on June 12, 1898."
      }
    ],
    gallery_images: [],
    social_links: {},
  },
  {
    id: "4",
    name: "Apolinario Mabini",
    slug: "apolinario-mabini", 
    tagline: "The Brain of the Revolution and political philosopher",
    category: "Historical Figures",
    image_url: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=500&fit=crop&crop=face",
    birthplace: "Batangas, Philippines",
    birth_year: 1864,
    current_location: "Batangas, Philippines (Historical)",
    biography: "Political philosopher and revolutionary leader known as the Brain of the Revolution...",
    achievements: [
      {
        year: 1899,
        title: "Authored Malolos Constitution",
        description: "Helped draft the constitution for the First Philippine Republic."
      }
    ],
    gallery_images: [],
    social_links: {},
  }
];

export default function ProfileDemo() {
  const handleViewRelatedProfile = (slug: string) => {
    console.log("Navigate to profile:", slug);
    // TODO: Implement navigation to profile page
  };

  return (
    <ProfilePage 
      profileData={mockProfileData}
      relatedProfiles={mockRelatedProfiles}
      onViewRelatedProfile={handleViewRelatedProfile}
    />
  );
}