const useAddCustomUrl = () => {
  const saveCurrentUrl = () => {
    localStorage.setItem("url_redireccion", window.location.href);
    console.log("Current URL saved:", window.location.href);
  };

  return { saveCurrentUrl };
};

export default useAddCustomUrl;
