const SUPABASE_URL = "https://hcybymfyppvifqtfxbpp.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhjeWJ5bWZ5cHB2aWZxdGZ4YnBwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk5MTkwOTYsImV4cCI6MjEwNTQ5NTA5Nn0.YYXbTzncZ2YFvJWURr8vGSRfrgQjrRHG3V4wplm_Dmw";

const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);