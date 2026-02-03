export const getAllCategories = async () => {
  const res = await fetch(
    import.meta.env.VITE_BACKEND_URL + "category/all_category",
    {
      method: "GET",
      credentials: "include",
    }
  );
  return res.json();
};
