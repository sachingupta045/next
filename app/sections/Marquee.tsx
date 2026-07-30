import { marqueeItems } from "../data/marquee"

const Marquee = () => {
    return (
        <div className="bg-red-600 py-[13px] overflow-hidden">
            <div className="flex w-max animate-[mqrun_44s_linear_infinite]">
                {/* First Set */}
                <div className="flex shrink-0 items-center gap-[38px] pr-[38px] whitespace-nowrap">
                    {marqueeItems.map((item, index) => (
                        <div key={`set1-${index}`} className="inline-flex items-center gap-[10px] text-white text-[0.86rem] font-medium">
                            <i className="fas fa-circle text-white/55 text-[0.55rem]"></i>
                            {item}
                        </div>
                    ))}
                </div>

                {/* Duplicate Set for Seamless Loop */}
                <div className="flex shrink-0 items-center gap-[38px] pr-[38px] whitespace-nowrap" aria-hidden="true">
                    {marqueeItems.map((item, index) => (
                        <div key={`set2-${index}`} className="inline-flex items-center gap-[10px] text-white text-[0.86rem] font-medium">
                            <i className="fas fa-circle text-white/55 text-[0.55rem]"></i>
                            {item}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Marquee