import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://yylgbpvgijqaeeiqhccz.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl5bGdicHZnaWpxYWVlaXFoY2N6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA0MTE3NDUsImV4cCI6MjA1NTk4Nzc0NX0.IQ7XPY08RS3LaI3_c8FfqE8G8tSlFIkifye4wejYurc";
export const supabase = createClient(supabaseUrl, supabaseKey);

