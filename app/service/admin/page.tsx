const fetchProfessionals = async () => {
  const { data, error } = await supabase
    .from("professionals")
    .select("*");

  console.log("ADMIN DATA:", data);
  console.log("ADMIN ERROR:", error);

  if (error) {
    alert("خطا: " + error.message);
    setLoading(false);
    return;
  }

  setProfessionals(data || []);
  setLoading(false);
};
useEffect(() => {
  fetchProfessionals();
}, []);
