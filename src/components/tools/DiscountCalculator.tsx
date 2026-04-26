import React, { useState } from 'react';
import type { FAQItem } from '../../hooks/useSEO'
import type { RelatedTool } from '../../lib/types';

const DiscountCalculator: React.FC = () => {
  const [originalPrice, setOriginalPrice] = useState<number | ''>('');
  const [discountPercentage, setDiscountPercentage] = useState<number | ''>('');
  const [salePrice, setSalePrice] = useState<number | null>(null);
  const [savings, setSavings] = useState<number | null>(null);

  const calculateDiscount = () => {
    if (originalPrice && discountPercentage) {
      const price = Number(originalPrice);
      const discount = Number(discountPercentage);

      if (!isNaN(price) && !isNaN(discount) && price >= 0 && discount >= 0 && discount <= 100) {
        const calculatedSalePrice = price * (1 - discount / 100);
        const calculatedSavings = price - calculatedSalePrice;
        setSalePrice(calculatedSalePrice);
        setSavings(calculatedSavings);
      } else {
        setSalePrice(null);
        setSavings(null);
      }
    } else {
      setSalePrice(null);
      setSavings(null);
    }
  };

  const faqs: FAQItem[] = [
    {
      question: "How do I calculate a discount manually?",
      answer: "To calculate a discount manually, first convert the percentage to a decimal (e.g., 20% becomes 0.20). Multiply the original price by this decimal to find the discount amount. Then, subtract the discount amount from the original price to get the final sale price. For example, for a $100 item with a 20% discount: $100 * 0.20 = $20 (discount amount). $100 - $20 = $80 (sale price)."
    },
    {
      question: "What is the difference between a discount and a markdown?",
      answer: "While often used interchangeably, a discount typically refers to a reduction in price offered to customers, often as part of a promotion or sale. A markdown is a reduction in the original selling price of an item, usually initiated by the retailer to clear inventory, respond to competition, or stimulate sales. Functionally, they both result in a lower price for the consumer."
    },
    {
      question: "Can I apply multiple discounts to an item?",
      answer: "Applying multiple discounts depends on the retailer's policy. Some retailers allow stacking discounts (e.g., a 10% off coupon on top of a 20% sale price), while others only allow one discount per item or transaction. When multiple discounts are applied, they are usually calculated sequentially, meaning the second discount is applied to the price after the first discount has been taken."
    },
    {
      question: "How does sales tax affect discounted prices?",
      answer: "Sales tax is typically calculated on the final sale price of an item, after all discounts have been applied. So, if an item originally costs $100, has a 20% discount, and a 5% sales tax, the calculation would be: $100 - 20% = $80 (sale price). Then, $80 * 0.05 = $4 (sales tax). The total cost would be $80 + $4 = $84."
    },
    {
      question: "Why are discounts important for businesses and consumers?",
      answer: "For businesses, discounts can drive sales, attract new customers, clear old inventory, and increase customer loyalty. For consumers, discounts provide opportunities to save money, purchase items they might not otherwise afford, and feel a sense of value. They are a common and effective marketing strategy in retail."
    }
  ];

  const relatedTools: RelatedTool[] = [
    {
      title: "Percentage Calculator",
      slug: "percentage-calc",
      emoji: "%",
    },
    {
      title: "Tip Calculator",
      slug: "tip-calculator",
      emoji: "💰",
    },
    {
      title: "GPA Calculator",
      slug: "gpa-calculator",
      emoji: "🎓",
    },
  ];

  return (
    <div className="tool-widget-content">
      <div className="container mx-auto p-4 font-['Plus_Jakarta_Sans']">
        <div className="mb-4">
          <label htmlFor="originalPrice" className="block text-gray-700 text-sm font-bold mb-2">Original Price ($):</label>
          <input
            type="number"
            id="originalPrice"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={originalPrice}
            onChange={(e) => setOriginalPrice(e.target.value === '' ? '' : Number(e.target.value))}
            placeholder="e.g., 100"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="discountPercentage" className="block text-gray-700 text-sm font-bold mb-2">Discount Percentage (%):</label>
          <input
            type="number"
            id="discountPercentage"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={discountPercentage}
            onChange={(e) => setDiscountPercentage(e.target.value === '' ? '' : Number(e.target.value))}
            placeholder="e.g., 20"
          />
        </div>
        <button
          onClick={calculateDiscount}
          className="bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Calculate Discount
        </button>

        {salePrice !== null && savings !== null && (
          <div className="mt-6 p-4 bg-gray-100 rounded-lg">
            <h3 className="text-lg font-bold mb-2">Results:</h3>
            <p>Sale Price: <span className="font-semibold text-green-700">${salePrice.toFixed(2)}</span></p>
            <p>You Save: <span className="font-semibold text-yellow-600">${savings.toFixed(2)}</span></p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DiscountCalculator;