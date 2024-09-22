import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Product, Variant } from '../../interfaces/product.interface';
import Spinner from '../spinner/spinner.component';

const ProductDetailPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            try {
                const response = await fetch(`http://localhost:5001/api/products/${id}`);
                const result = await response.json();
                if (result.statusCode === 200) {
                    setProduct(result.data);
                } else {
                    console.error('Error fetching product:', result.message);
                }
            } catch (error) {
                console.error('Error fetching product:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spinner />
            </div>
        );
    }

    if (!product) {
        return <p className="text-center text-gray-600">Product not found</p>;
    }

    return (
        <div className="container mx-auto p-4">
            <button
                onClick={() => navigate(-1)}
                className="mb-4 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition duration-300"
            >
                Back
            </button>
            <h1 className="text-3xl font-bold text-black-700 mb-4">{product.name}</h1>
            <div className="flex flex-col md:flex-row gap-8">
                <img
                    src={product.image || '/placeholder.jpg'}
                    alt={product.name}
                    className="w-auto h-auto object-cover rounded-lg border border-gray-200"
                    style={{ maxHeight: '500px' }}
                />
                <div className="md:w-1/2">
                    <p className="text-lg mb-4">{product.description}</p>
                    <p className="text-xl font-bold text-black-600 mb-4">${product.price.toFixed(2)}</p>
                    {product.variants && product.variants.length > 0 && (
                        <div>
                            <h2 className="text-lg font-semibold mb-2">Select a Variant</h2>
                            <select
                                onChange={(e) => console.log('Selected variant:', e.target.value)}
                                className="border border-blue-500 p-2 rounded-lg bg-white"
                            >
                                {product.variants.map((variant: Variant) => (
                                    <option key={variant.id} value={variant.id}>
                                        {variant.name} - ${variant.price?.toFixed(2)} (Stock: {variant.stockQuantity})
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;
