

const ProductCard = ({ product }) => {
    return (
        <div className="border p-4 rounded shadow-md hover:bg-gray-100 cursor-pointer flex flex-col h-full">
          <img
            src={product.image || '/placeholder.jpg'}
            alt={product.name}
            className="w-full h-96 object-cover mb-4 rounded" 
          />
          <div className="flex-1">
            <h2 className="text-lg font-semibold mb-2 truncate">{product.name}</h2>
            <p className="text-sm text-gray-600 mb-2 truncate">{product.description}</p>
            <p className="font-bold text-lg">${product.price.toFixed(2)}</p>
          </div>
        </div>
      );
};

export default ProductCard;
