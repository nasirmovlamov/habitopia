import { CoinIcon } from "@/assets/CoinIcon";
import { StockIcon } from "@/assets/StockIcon";
import { ProductType } from "@/model/ProductType";
import { useMarketStore } from "@/store/useMarket";
import { toast } from "react-hot-toast";
import useSound from "use-sound";

export const Product = ({ product }: { product: ProductType }) => {
  const [playRewardSound] = useSound(
    "https://habitica.com/static/audio/rosstavoTheme/Reward.ogg"
  );
  const [playNotInStockSound] = useSound(
    "https://habitica.com/static/audio/rosstavoTheme/Minus_Habit.ogg"
  );
  const {
    buy: buyProduct,
    remove: removeProduct,
    update: updateHabit,
    increaseProductStock: increaseStock,
    decreaseProductStock: decreaseStock,
  } = useMarketStore();

  const handleBuy = () => {
    try {
      const response = buyProduct(product.id);
      console.log(response);
      playRewardSound();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
        playNotInStockSound();
      }
    }
  };

  const handleRemove = () => {
    removeProduct(product.id);
  };

  const handleIncreaseStock = () => {
    try {
      increaseStock(product.id);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  const handleDecreaseStock = () => {
    try {
      decreaseStock(product.id);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <div className="relative flex justify-between  bg-gray-100   text-black text-start">
      <button
        onClick={handleRemove}
        className="absolute top-0 right-0 p-2 z-20"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-red-800"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <div className="flex flex-col w-full p-5">
        <div className="text-2xl w-full">{product.name}</div>
        <div className=" w-full">{product.description}</div>
        <div className=" w-full flex items-center gap-2">
          {product.price}
          <CoinIcon />
        </div>
        <div className=" w-full flex items-center gap-2">
          {" "}
          {product.stock} <StockIcon />
        </div>
        <div>
          <button onClick={handleIncreaseStock}>+</button>
          <button onClick={handleDecreaseStock}>-</button>
        </div>
      </div>
      {/* buy button */}
      <button
        onClick={handleBuy}
        className="bg-green-500 p-3 text-white grid place-items-center"
      >
        buy
      </button>
    </div>
  );
};
