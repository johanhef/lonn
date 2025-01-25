import Image from "next/image";
import SalaryCalculator from "./SalaryCalculator";

export default function Home() {

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center" aria-label="Lønnskalkulator">
        <div className="flex items-center justify-center">
          <Image
            className="dark:invert"
            src="/lonn-logo.png"
            alt="Lønnskalkulator - logo"
            width={180}
            height={38}
            priority
          />
        </div>
        <SalaryCalculator />
      </main>
    </div>
  );
}
