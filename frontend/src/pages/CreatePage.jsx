import { useState } from "react";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { useProductStore } from "../store/product";

const CreatePage = ({ darkMode, setToastMessage, setOpenToast, setToastColor }) => {
    const [newProduct, setNewProduct] = useState({ name: "", price: "0", image: "" });
    const navigate = useNavigate(); // Initialize navigate
  
    const { createProduct } = useProductStore();
  
    const handleAddProduct = async () => {
      if (!newProduct.name || !newProduct.price || !newProduct.image) {
        setToastMessage("All fields are required");
        setToastColor("#f44336"); // Red for error
        setOpenToast(true);
        return;
      }
  
      const { success, message } = await createProduct(newProduct);
      setToastMessage(message);
      setToastColor(success ? "#4caf50" : "#f44336"); // Green for success, red for error
      setOpenToast(true);
  
      if (success) {
        setNewProduct({ name: "", price: "0", image: "" });
        navigate("/"); // Redirect to homepage
      }
    };
  
    return (
      <Container maxWidth="sm">
        <Box display="flex" flexDirection="column" alignItems="center" gap={3} mt={4}>
          <Typography
            variant="h4"
            component="h1"
            textAlign="center"
            sx={{
              color: darkMode ? "#e7decf" : "#3e352e",
            }}
          >
            Create New Product
          </Typography>
  
          <Box
            width="100%"
            bgcolor={darkMode ? "#3e352e" : "#faecd7"}
            p={3}
            borderRadius={2}
            boxShadow={2}
            sx={{
              color: darkMode ? "#e7decf" : "#3e352e",
              border: darkMode ? "1px solid #907a61" : "1px solid #ac8969",
            }}
          >
            <TextField
              fullWidth
              label="Product Name"
              variant="outlined"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              margin="normal"
              sx={{
                input: { color: darkMode ? "#e7decf" : "#3e352e" },
                fieldset: { borderColor: darkMode ? "#907a61" : "#ac8969" },
                "& .MuiInputLabel-root": { color: darkMode ? "#ba8d56" : "#3e352e" },
              }}
            />
            <TextField
              fullWidth
              label="Price"
              variant="outlined"
              type="number"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
              margin="normal"
              sx={{
                input: { color: darkMode ? "#e7decf" : "#3e352e" },
                fieldset: { borderColor: darkMode ? "#907a61" : "#ac8969" },
                "& .MuiInputLabel-root": { color: darkMode ? "#ba8d56" : "#3e352e" },
              }}
            />
            <TextField
              fullWidth
              label="Image URL"
              variant="outlined"
              value={newProduct.image}
              onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
              margin="normal"
              sx={{
                input: { color: darkMode ? "#e7decf" : "#3e352e" },
                fieldset: { borderColor: darkMode ? "#907a61" : "#ac8969" },
                "& .MuiInputLabel-root": { color: darkMode ? "#ba8d56" : "#3e352e" },
              }}
            />
  
            <Button
              variant="contained"
              fullWidth
              onClick={handleAddProduct}
              sx={{
                mt: 2,
                backgroundColor: darkMode ? "#907a61" : "#ac8969",
                color: "#fff",
                "&:hover": {
                  backgroundColor: darkMode ? "#ba8d56" : "#8c6c50",
                },
              }}
            >
              Add Product
            </Button>
          </Box>
        </Box>
      </Container>
    );
  };
  
  export default CreatePage;
  
