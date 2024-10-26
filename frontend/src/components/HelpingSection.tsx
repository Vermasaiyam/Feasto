import React from 'react';
import { ShoppingCart,  Award, Truck } from 'lucide-react';

interface Props {
  title: string;
  icon: React.ReactElement;
  description: string;
}

const Feature = ({ title, icon, description }: Props) => (
  <div className="feature-card p-6 rounded-lg shadow-md flex flex-col items-center bg-white hover:shadow-lg transition-shadow cursor-pointer">
    <div className="icon-container rounded-full p-4 bg-lightGreen shadow-md">
      {icon}
    </div>
    <h3 className="text-xl font-bold mt-4 text-center text-darkGreen">{title}</h3>
    <p className="text-gray-600 mt-2 text-center">{description}</p>
  </div>
);

const HelpingSection = () => {
  const features = [
    {
      title: 'Easy To Order',
      icon: <ShoppingCart className="h-12 w-12 text-green-500" />,
      description:
        'Order your favorite meals with a few taps and get them delivered quickly.',
    },
    {
      title: 'Fastest Delivery',
      icon: <Truck className="h-12 w-12 text-green-500" />,
      description:
        'Experience the fastest delivery with our reliable and efficient service.',
    },
    {
      title: 'Best Quality',
      icon: <Award className="h-12 w-12 text-green-500" />,
      description:
        'We ensure top quality in every meal, made fresh to satisfy your cravings.',
    },
  ];

  return (
    <div className="container mx-auto py-12 px-4 md:px-8">
      {/* <h2 className="text-3xl font-bold text-center mb-8">Our Awesome Features</h2> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <Feature
            key={index}
            title={feature.title}
            icon={feature.icon}
            description={feature.description}
          />
        ))}
      </div>
    </div>
  );
};

export default HelpingSection;