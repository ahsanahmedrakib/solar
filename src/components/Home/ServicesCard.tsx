import { ServiceCard } from "@/types/services";
import Image from "next/image";
import Link from "next/link";

const ServicesCard = ({ services }: { services: ServiceCard[] }) => {
  return (
    <div>
      {/* SERVICES CARD GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-4">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-white rounded-4xl p-6 shadow-sm border border-gray-100/60 flex flex-col justify-between hover:shadow-md transition-shadow group"
          >
            <div className="space-y-5">
              {/* Image Container with Floating Icon */}
              <div className="relative w-full aspect-1.5/1 rounded-2xl overflow-hidden bg-gray-50">
                <Image
                  src={service.image}
                  alt={service.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 30vw"
                  className="object-cover"
                />
                {/* Floating badge icon */}
                <div className="absolute top-4 left-4 w-11 h-11 rounded-full bg-[#44B549] text-white flex items-center justify-center shadow-md">
                  {service.iconSvg}
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-bold text-[#051720]">
                  {service.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>

            <div className="pt-6">
              <Link href={"services/" + service.slug}>
                <button className="inline-flex cursor-pointer items-center gap-2 font-bold text-sm text-[#051720] group-hover:text-[#44B549] transition-colors">
                  Learn More
                  <div className="w-5 h-5 rounded-full bg-[#44B549] text-white flex items-center justify-center text-[10px]">
                    ➔
                  </div>
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesCard;
