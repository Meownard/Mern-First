import { useEffect } from "react";
import { Container, Typography, Box } from "@mui/material";
import Grid2 from '@mui/material/Grid2';  // Correct import for Grid2
import { useProductStore } from "../store/product";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";

const HomePage = ({ darkMode, toastMessage, openToast }) => {
    const productStore = useProductStore();
    const { fetchProducts, products } = productStore;

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    return (
        <Container maxWidth="xl" sx={{ py: 5, color: darkMode ? "#e7decf" : "#3e352e" }}>
            <Typography
                variant="h4"
                fontWeight="bold"
                align="center"
                sx={{
                    background: darkMode ? "linear-gradient(90deg, #ba8d56, #8c6c50)" : "linear-gradient(90deg, #ac8969, #8c6c50)",
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                    transition: "background 0.3s ease",
                }}
            >
                Current Products 🚀
            </Typography>
            {/* Display success message */}
            {openToast && (
                <Box sx={{ width: '100%', textAlign: 'center', marginTop: 2, backgroundColor: "rgb(50 50 50 / 0%)" }}>
                    <Typography variant="body1" sx={{ color: 'green' }}>
                        {toastMessage}
                    </Typography>
                </Box>
            )}
            <Grid2 container spacing={4} justifyContent="center" sx={{ mt: 3 }}>
                {products.length > 0 ? (
                    products.map((product) => (
                        <Grid2
                            key={product._id}
                            size={{ xs: 12, sm: 6, md: 4 }} // Ensuring 3 cards per row with space in between
                        >
                            <ProductCard product={product} darkMode={darkMode} />
                        </Grid2>
                    ))
                ) : (
                    <Box sx={{ textAlign: "center", width: "100%", mt: 3 }}>
                        <Typography variant="h6" sx={{ color: darkMode ? "#e7decf" : "#6b4f3d" }}>
                            No products found 😢{" "}
                            <Link
                                to="/create"
                                style={{
                                    color: darkMode ? "#ba8d56" : "#8c6c50",
                                    textDecoration: "underline",
                                    fontWeight: "bold",
                                    transition: "color 0.3s ease",
                                }}
                            >
                                Create a product
                            </Link>
                        </Typography>
                    </Box>
                )}
            </Grid2>
        </Container>
    );
};

export default HomePage;
