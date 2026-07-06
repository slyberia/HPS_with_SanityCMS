/**
 * Fallback content, used whenever the Sanity dataset is unreachable or a
 * document type has no published entries yet. Mirrors the starter content
 * seeded into the CMS so the site never renders empty.
 */
import type {
  Post,
  Project,
  Service,
  SiteSettings,
  TeamMember,
} from "./types";

export const fallbackSettings: SiteSettings = {
  title: "HPS Geospatial",
  tagline: "Precision in every dimension.",
  description:
    "HPS Geospatial delivers survey-grade mapping, LiDAR, GIS and reality-capture services for clients who demand certainty — from estate masterplans to national infrastructure.",
  email: "enquiries@hpsgeospatial.com",
  phone: "+1 (555) 010-4720",
  address: "Suite 12, The Meridian Building\n48 Observatory Row",
  stats: [
    { value: "20+", label: "Years of practice" },
    { value: "1.2M ha", label: "Terrain mapped" },
    { value: "±2 cm", label: "Survey-grade accuracy" },
    { value: "300+", label: "Projects delivered" },
  ],
};

export const fallbackServices: Service[] = [
  {
    _id: "fallback-service-lidar",
    title: "LiDAR & Aerial Mapping",
    slug: "lidar-aerial-mapping",
    summary:
      "High-density aerial LiDAR and photogrammetry, flown and processed in-house to survey grade.",
    features: [
      "Fixed-wing and rotary aerial LiDAR acquisition",
      "Dense point clouds to 800 pts/m²",
      "Digital terrain and surface models",
      "Orthomosaic imagery at 2 cm GSD",
    ],
  },
  {
    _id: "fallback-service-cadastral",
    title: "Cadastral & Boundary Surveying",
    slug: "cadastral-boundary-surveying",
    summary:
      "Licensed boundary determination, subdivisions and title surveys executed with legal rigour.",
    features: [
      "Boundary re-establishment and marking",
      "Subdivision and consolidation plans",
      "Easement and lease surveys",
      "Expert-witness support",
    ],
  },
  {
    _id: "fallback-service-gis",
    title: "GIS & Spatial Analytics",
    slug: "gis-spatial-analytics",
    summary:
      "Authoritative spatial databases, analysis and cartography that turn raw data into decisions.",
    features: [
      "Enterprise GIS design and migration",
      "Suitability and catchment analysis",
      "Bespoke web mapping portals",
      "Cartographic production",
    ],
  },
  {
    _id: "fallback-service-uav",
    title: "UAV Data Acquisition",
    slug: "uav-data-acquisition",
    summary:
      "CASA/FAA-certified drone operations for rapid, repeatable capture of sites large and small.",
    features: [
      "Corridor and volumetric surveys",
      "Progress monitoring programmes",
      "Thermal and multispectral sensors",
      "Confined and restricted airspace operations",
    ],
  },
  {
    _id: "fallback-service-hydro",
    title: "Hydrographic Surveying",
    slug: "hydrographic-surveying",
    summary:
      "Multibeam bathymetry and coastal mapping for ports, dredging and environmental programmes.",
    features: [
      "Multibeam and single-beam bathymetry",
      "Tidal and current observations",
      "Dredge volume computation",
      "Seamless topo-bathy surfaces",
    ],
  },
  {
    _id: "fallback-service-twins",
    title: "3D Reality Capture & Digital Twins",
    slug: "reality-capture-digital-twins",
    summary:
      "Terrestrial scanning and BIM-ready models that give owners a living replica of their assets.",
    features: [
      "Terrestrial and mobile laser scanning",
      "Scan-to-BIM modelling",
      "As-built verification",
      "Asset-management integration",
    ],
  },
];

export const fallbackProjects: Project[] = [
  {
    _id: "fallback-project-coastal",
    title: "Coastal Resilience Mapping Programme",
    slug: "coastal-resilience-mapping",
    client: "Department of Environment",
    location: "Eastern Seaboard",
    summary:
      "A three-year topo-bathymetric LiDAR programme mapping 400 km of vulnerable coastline to underpin storm-surge modelling and defence design.",
    featured: true,
    completedAt: "2025-11-01",
    stats: [
      { value: "400 km", label: "Coastline captured" },
      { value: "±5 cm", label: "Vertical accuracy" },
      { value: "3 yrs", label: "Programme duration" },
    ],
  },
  {
    _id: "fallback-project-rail",
    title: "Metro Rail Corridor Digital Twin",
    slug: "metro-rail-digital-twin",
    client: "City Transit Authority",
    location: "Central Metropolitan Line",
    summary:
      "Mobile laser scanning of a 28 km live rail corridor, delivered as a federated BIM digital twin for asset management and clearance analysis.",
    featured: true,
    completedAt: "2025-06-15",
    stats: [
      { value: "28 km", label: "Corridor scanned" },
      { value: "9 nights", label: "Possession windows" },
      { value: "14,000+", label: "Assets catalogued" },
    ],
  },
  {
    _id: "fallback-project-estate",
    title: "Highlands Estate Masterplan Survey",
    slug: "highlands-estate-masterplan",
    client: "Private Estate",
    location: "Northern Highlands",
    summary:
      "Discreet, survey-grade mapping of a 2,400-hectare private estate — boundaries, hydrology and heritage structures — for a generational masterplan.",
    featured: true,
    completedAt: "2024-10-01",
    stats: [
      { value: "2,400 ha", label: "Estate area" },
      { value: "60+", label: "Heritage features recorded" },
      { value: "1", label: "Unified estate datum" },
    ],
  },
];

export const fallbackPosts: Post[] = [
  {
    _id: "fallback-post-lidar-councils",
    title: "What Survey-Grade LiDAR Actually Buys You",
    slug: "what-survey-grade-lidar-buys-you",
    excerpt:
      "Point density and vertical accuracy are quoted on every proposal, but the difference between marketing numbers and survey-grade deliverables is where projects are won or lost.",
    publishedAt: "2026-05-18T09:00:00Z",
    tags: ["LiDAR", "Standards"],
    author: { name: "Eleanor Vance", role: "Principal Surveyor" },
  },
  {
    _id: "fallback-post-digital-twins",
    title: "Digital Twins Are a Governance Question, Not a Technology One",
    slug: "digital-twins-governance",
    excerpt:
      "The scanners are the easy part. The organisations that extract value from digital twins are the ones that decide, early, who owns the model and who keeps it honest.",
    publishedAt: "2026-03-02T09:00:00Z",
    tags: ["Digital Twins", "Strategy"],
    author: { name: "Marcus Okafor", role: "Head of Reality Capture" },
  },
  {
    _id: "fallback-post-boundaries",
    title: "Old Boundaries, New Instruments: Re-establishing Historic Titles",
    slug: "re-establishing-historic-titles",
    excerpt:
      "When a 19th-century parchment plan meets millimetre-grade GNSS, the law — not the instrument — decides where the fence goes. A field guide to reconciling the two.",
    publishedAt: "2026-01-12T09:00:00Z",
    tags: ["Cadastral", "Law"],
    author: { name: "Priya Raman", role: "Licensed Cadastral Surveyor" },
  },
];

export const fallbackTeam: TeamMember[] = [
  {
    _id: "fallback-team-eleanor",
    name: "Eleanor Vance",
    slug: "eleanor-vance",
    role: "Principal Surveyor & Founder",
    bio: "Eleanor founded HPS after two decades leading national mapping programmes. She sets the firm's exacting standard: every deliverable defensible, every datum documented.",
    credentials: ["Licensed Surveyor", "FRICS"],
  },
  {
    _id: "fallback-team-marcus",
    name: "Marcus Okafor",
    slug: "marcus-okafor",
    role: "Head of Reality Capture",
    bio: "Marcus leads the scanning and digital-twin practice, bridging site capture and BIM so that models remain trustworthy long after handover.",
    credentials: ["MEng Geomatics", "Certified BIM Manager"],
  },
  {
    _id: "fallback-team-priya",
    name: "Priya Raman",
    slug: "priya-raman",
    role: "Licensed Cadastral Surveyor",
    bio: "Priya specialises in complex boundary re-establishment and expert-witness work, with a particular interest in reconciling historic titles with modern measurement.",
    credentials: ["Licensed Cadastral Surveyor"],
  },
  {
    _id: "fallback-team-tomas",
    name: "Tomás Herrera",
    slug: "tomas-herrera",
    role: "Chief Remote Pilot",
    bio: "Tomás runs HPS's UAV operations — certified for corridor, night and restricted-airspace work — and has logged over 3,000 commercial flight hours.",
    credentials: ["Chief Remote Pilot", "Instrument Rated"],
  },
];
