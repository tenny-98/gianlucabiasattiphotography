import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const { tag } = req.query;

    if (!tag) {
      return res.status(400).json({ error: 'Tag parameter is required' });
    }

    // Fetcha tutte le risorse con il tag specificato
    const resources = await cloudinary.api.resources_by_tag(tag, {
      max_results: 500,
    });

    // Trasforma i dati in formato leggibile dal frontend
    const photos = resources.resources.map((resource) => ({
      public_id: resource.public_id,
      url: `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/w_800,q_auto,f_auto/${resource.public_id}`,
      fullUrl: `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/w_1600,q_auto,f_auto/${resource.public_id}`,
      alt: resource.public_id.split('/').pop(),
    }));

    res.status(200).json(photos);
  } catch (error) {
    console.error('Cloudinary API Error:', error);
    res.status(500).json({ error: 'Failed to fetch photos', details: error.message });
  }
}
