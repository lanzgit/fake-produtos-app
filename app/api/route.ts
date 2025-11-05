const EXTERNAL_API_URL = "https://fakestoreapi.com/products";

export async function GET() {
  try {
    const response = await fetch(EXTERNAL_API_URL);
    const data = await response.json();
    
    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return new Response(JSON.stringify({ error: "Erro ao buscar produtos" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}