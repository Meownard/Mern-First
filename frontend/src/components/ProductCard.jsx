import { useState } from "react";
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    TextField,
    Typography,
    useTheme,
    Snackbar,
    Alert
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { useProductStore } from "../store/product";

const ProductCard = ({ product, darkMode }) => {
    const [updatedProduct, setUpdatedProduct] = useState(product);
    const [open, setOpen] = useState(false);
    const [toast, setToast] = useState({ open: false, message: "", severity: "success" });

    const { deleteProduct, updateProduct } = useProductStore();

    const handleDeleteProduct = async (pid) => {
        const { success, message } = await deleteProduct(pid);
        setToast({
            open: true,
            message: success ? "Product deleted successfully" : `Error: ${message}`,
            severity: success ? "success" : "error",
        });
    };

    const handleUpdateProduct = async () => {
        const { success } = await updateProduct(product._id, updatedProduct);
        setOpen(false);
        setToast({
            open: true,
            message: success ? "Product updated successfully" : "Error updating product",
            severity: success ? "success" : "error",
        });
    };

    return (
        <Card
            sx={{
                width: "100%",
                maxWidth: 500,
                backgroundColor: darkMode ? "#3e352e" : "#faecd7", // Matches app theme
                color: darkMode ? "#e7decf" : "#3e352e",
                boxShadow: 3,
                border: darkMode ? "1px solid #907a61" : "1px solid #ac8969",
            }}
        >
            <CardMedia component="img" height="200" image={product.image} alt={product.name} />
            <CardContent>
                <Typography variant="h6" sx={{ color: darkMode ? "#e7decf" : "#3e352e" }}>
                    {product.name}
                </Typography>
                <Typography variant="h5" sx={{ color: darkMode ? "#ba8d56" : "#8c6c50" }}>
                    ${product.price}
                </Typography>
            </CardContent>
            <CardActions>
                <IconButton sx={{ color: darkMode ? "#ba8d56" : "#8c6c50" }} onClick={() => setOpen(true)}>
                    <Edit />
                </IconButton>
                <IconButton color="error" onClick={() => handleDeleteProduct(product._id)}>
                    <Delete />
                </IconButton>
            </CardActions>

            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Update Product</DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        label="Product Name"
                        value={updatedProduct.name}
                        onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Price"
                        type="number"
                        value={updatedProduct.price}
                        onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Image URL"
                        value={updatedProduct.image}
                        onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })}
                        margin="dense"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button color="primary" variant="contained" onClick={handleUpdateProduct}>
                        Update
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Snackbar for success/error messages */}
            <Snackbar
                open={toast.open}
                autoHideDuration={4000}
                onClose={() => setToast({ ...toast, open: false })}
                anchorOrigin={{ vertical: "top", horizontal: "center" }} // Centered position
            >
                <Alert severity={toast.severity} sx={{ textAlign: "center", width: "100%" }}>
                    {toast.message}
                </Alert>
            </Snackbar>
        </Card>
    );
};

export default ProductCard;
