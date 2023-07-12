import { CoinIcon } from "@/assets/CoinIcon";
import { StockIcon } from "@/assets/StockIcon";
import { ProductType } from "@/models/ProductType";
import { useMarketStore } from "@/store/useMarket";
import { toast } from "react-hot-toast";
import useSound from "use-sound";
import { ProductEdit } from "./ProductEdit";

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
    <div className="relative flex justify-between  bg-gray-100   text-black text-start rounded-lg min-h-[120px] box-border">
      <div className="flex flex-col w-full p-5 relative">
        <div className="text-2xl w-full">{product.name}</div>
        <div className=" w-full">{product.description}</div>

        <div className=" w-full flex items-center gap-2">
          <span>{product.stock}</span>
          <StockIcon />
          <div className="flex gap-1 h-max">
            <button
              onClick={handleIncreaseStock}
              className="text-xs rounded-lg px-2 bg-green-300 text-black"
            >
              +
            </button>
            <button
              onClick={handleDecreaseStock}
              className="text-xs rounded-lg px-2 bg-orange-300 text-black"
            >
              -
            </button>
          </div>
        </div>

        <div className="absolute top-2 right-2">
          <ProductEdit product={product} />
        </div>
      </div>
      {/* buy button */}
      <button
        onClick={handleBuy}
        className="bg-[rgba(255,190,93,.15)] p-3 text-white grid place-items-center"
        style={{
          borderTopRightRadius: "0.5rem",
          borderBottomRightRadius: "0.5rem",
        }}
      >
        <div className="flex  flex-col text-gray-600">
          <CoinIcon width={30} height={30} />
          <span className="text-xs font-bold ">{product.price}</span>
        </div>
      </button>
    </div>
  );
};
