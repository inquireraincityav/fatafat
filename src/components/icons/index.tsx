export function HomeIcon({ className = "", color = "currentColor" }: { className?: string; color?: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M3 8.5L11 2L19 8.5V18C19 18.5304 18.7893 19.0391 18.4142 19.4142C18.0391 19.7893 17.5304 20 17 20H5C4.46957 20 3.96086 19.7893 3.58579 19.4142C3.21071 19.0391 3 18.5304 3 18V8.5Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8 20V11H14V20" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function TicketsIcon({ className = "", color = "currentColor" }: { className?: string; color?: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="4" width="18" height="14" rx="2" stroke={color} strokeWidth="1.5"/>
      <path d="M2 9H20" stroke={color} strokeWidth="1.5"/>
      <path d="M6 14H10" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

export function ExploreIcon({ className = "", color = "currentColor" }: { className?: string; color?: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <circle cx="11" cy="11" r="9" stroke={color} strokeWidth="1.5"/>
      <path d="M14.5 7.5L12.5 12.5L7.5 14.5L9.5 9.5L14.5 7.5Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  );
}

export function SearchIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <circle cx="6" cy="6" r="4.5" stroke="#a09890" strokeWidth="1.2"/>
      <path d="M9.5 9.5L12.5 12.5" stroke="#a09890" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  );
}

export function GearIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="17" height="17" viewBox="0 0 20 20" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z" stroke="#6b6760" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16.167 12.5C16.0561 12.7513 16.0194 13.0302 16.0617 13.3025C16.104 13.5749 16.2234 13.8292 16.4053 14.0333L16.4587 14.0867C16.6057 14.2335 16.7226 14.4076 16.803 14.5994C16.8834 14.7912 16.9256 14.9971 16.9272 15.2053C16.9288 15.4134 16.8898 15.62 16.8123 15.8131C16.7349 16.0062 16.6207 16.1822 16.4761 16.3311C16.3316 16.48 16.1592 16.5993 15.9687 16.6824C15.7782 16.7654 15.5731 16.8105 15.365 16.8151C15.1568 16.8197 14.9499 16.7838 14.7559 16.7093C14.5619 16.6349 14.3845 16.5234 14.232 16.3807L14.1787 16.3273C13.9745 16.1454 13.7203 16.026 13.4479 15.9837C13.1755 15.9414 12.8967 15.978 12.6453 16.089C12.3986 16.1951 12.1886 16.3711 12.041 16.5953C11.8934 16.8194 11.8145 17.0819 11.8137 17.3507V17.5C11.8137 17.942 11.638 18.366 11.3255 18.6785C11.013 18.991 10.589 19.1667 10.147 19.1667C9.70501 19.1667 9.28101 18.991 8.96853 18.6785C8.65605 18.366 8.48034 17.942 8.48034 17.5V17.4253C8.4747 17.1492 8.38778 16.8807 8.23058 16.6538C8.07337 16.4268 7.85311 16.2517 7.597 16.1513C7.34562 16.0404 7.06681 16.0037 6.79445 16.046C6.52209 16.0883 6.26785 16.2077 6.06367 16.3897L6.01034 16.443C5.85784 16.5857 5.68044 16.6972 5.48648 16.7717C5.29251 16.8461 5.08558 16.882 4.87745 16.8774C4.66932 16.8728 4.46414 16.8277 4.27366 16.7447C4.08319 16.6616 3.91078 16.5423 3.76621 16.3934C3.62164 16.2446 3.50747 16.0686 3.42999 15.8755C3.35251 15.6824 3.31341 15.4758 3.31504 15.2677C3.31667 15.0595 3.35899 14.8536 3.43937 14.6618C3.51975 14.47 3.63664 14.2959 3.78367 14.149L3.83701 14.0957C4.01889 13.8915 4.13835 13.6373 4.18063 13.3649C4.22292 13.0925 4.18625 12.8137 4.07534 12.5623C3.96922 12.3157 3.79319 12.1057 3.56904 11.9581C3.34489 11.8105 3.08238 11.7316 2.81367 11.7307H2.66701C2.22498 11.7307 1.80098 11.555 1.48849 11.2425C1.17601 10.93 1.00034 10.506 1.00034 10.064C1.00034 9.62198 1.17601 9.19798 1.48849 8.88549C1.80098 8.57301 2.22498 8.39734 2.66701 8.39734H2.74167C3.01778 8.3917 3.28628 8.30478 3.51325 8.14758C3.74023 7.99037 3.91531 7.77011 4.01567 7.514C4.12659 7.26262 4.16326 6.98381 4.12097 6.71145C4.07869 6.43909 3.95923 6.18485 3.77734 5.98067L3.72401 5.92734C3.57698 5.77484 3.46009 5.59744 3.37971 5.40348C3.29933 5.20951 3.25701 5.00258 3.25538 4.79445C3.25375 4.58632 3.29285 4.37984 3.37033 4.18666C3.44781 3.99349 3.56198 3.81738 3.70655 3.66821C3.85112 3.51903 4.02353 3.39986 4.21401 3.31666C4.40448 3.23346 4.60966 3.18836 4.81779 3.18673C5.02592 3.1851 5.23285 3.2274 5.42681 3.30778C5.62078 3.38816 5.79818 3.50505 5.95067 3.65208L6.00401 3.70542C6.20819 3.8873 6.46243 4.00676 6.73479 4.04905C7.00715 4.09133 7.28596 4.05466 7.53734 3.94375H7.597C7.84367 3.83763 8.0537 3.6616 8.20131 3.43745C8.34892 3.2133 8.42783 2.95079 8.42867 2.682V2.5C8.42867 2.05797 8.60438 1.63397 8.91686 1.32149C9.22934 1.00901 9.65334 0.833336 10.0953 0.833336C10.5374 0.833336 10.9614 1.00901 11.2738 1.32149C11.5863 1.63397 11.762 2.05797 11.762 2.5V2.57467C11.7629 2.84338 11.8418 3.10589 11.9894 3.33004C12.137 3.55419 12.347 3.73022 12.5937 3.83634C12.845 3.94725 13.1239 3.98392 13.3962 3.94163C13.6686 3.89935 13.9228 3.77989 14.127 3.59801L14.1803 3.54467C14.3328 3.39764 14.5102 3.28075 14.7042 3.20037C14.8982 3.11999 15.1051 3.07767 15.3132 3.07604C15.5214 3.07441 15.7278 3.11351 15.921 3.19099C16.1142 3.26847 16.2903 3.38264 16.4395 3.52721C16.5887 3.67178 16.7078 3.84419 16.791 4.03466C16.8742 4.22514 16.9193 4.43032 16.921 4.63845C16.9226 4.84658 16.8803 5.05351 16.7999 5.24748C16.7195 5.44144 16.6026 5.61884 16.4557 5.76634L16.4023 5.81967C16.2204 6.02385 16.101 6.27809 16.0587 6.55045C16.0164 6.82281 16.0531 7.10163 16.164 7.353V7.41234C16.2701 7.659 16.4461 7.86903 16.6703 8.01664C16.8944 8.16425 17.1569 8.24316 17.4257 8.244H17.5C17.942 8.244 18.366 8.41968 18.6785 8.73216C18.991 9.04464 19.1667 9.46864 19.1667 9.91067C19.1667 10.3527 18.991 10.7767 18.6785 11.0892C18.366 11.4017 17.942 11.5773 17.5 11.5773H17.4253C17.1566 11.5782 16.8941 11.6571 16.67 11.8047C16.4458 11.9523 16.2698 12.1623 16.1637 12.409" stroke="#6b6760" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function BackArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M15 10H5M5 10L10 5M5 10L10 15" stroke="#1f3a5f" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function ChevronRightIcon({ className = "", color = "#6b6760" }: { className?: string; color?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M5 2.5L9.5 7L5 11.5" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function ChevronDownIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M3 5L7 9L11 5" stroke="#6b6760" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="9" height="9" viewBox="0 0 12 12" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function TrainIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="4" width="16" height="20" rx="4" fill="#e8a63c"/>
      <rect x="11" y="8" width="10" height="6" rx="1" fill="#1f3a5f"/>
      <circle cx="12" cy="20" r="1.5" fill="#1f3a5f"/>
      <circle cx="20" cy="20" r="1.5" fill="#1f3a5f"/>
      <path d="M10 24L8 28" stroke="#e8a63c" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M22 24L24 28" stroke="#e8a63c" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

export function ClockIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <circle cx="5" cy="5" r="4" stroke="#a09890" strokeWidth="1"/>
      <path d="M5 3V5L6.5 6" stroke="#a09890" strokeWidth="1" strokeLinecap="round"/>
    </svg>
  );
}

export function BusIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="1.5" y="1.5" width="7" height="5.5" rx="1" stroke="#a09890" strokeWidth="0.8"/>
      <circle cx="3" cy="8" r="0.8" fill="#a09890"/>
      <circle cx="7" cy="8" r="0.8" fill="#a09890"/>
    </svg>
  );
}

export function SuccessCheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="24" r="22" stroke="#27ae60" strokeWidth="2" fill="rgba(39,174,96,0.1)"/>
      <path d="M15 24L21 30L33 18" stroke="#27ae60" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function PhoneIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="15" height="15" viewBox="0 0 20 20" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M18 14.5V17C18 17.55 17.55 18 17 18C9.28 18 3 11.72 3 4C3 3.45 3.45 3 4 3H6.5C7.05 3 7.5 3.45 7.5 4C7.5 5.25 7.7 6.45 8.07 7.57C8.18 7.92 8.1 8.31 7.82 8.59L6.09 10.32C7.57 13.07 9.93 15.43 12.68 16.91L14.41 15.18C14.69 14.9 15.08 14.82 15.43 14.93C16.55 15.3 17.75 15.5 19 15.5C19.55 15.5 20 15.95 20 16.5V19" stroke="#e8a63c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function MessageIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="15" height="15" viewBox="0 0 20 20" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M3 5H17V15H5L3 17V5Z" stroke="#1f3a5f" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function LocationDotIcon({ className = "", color = "#e8a63c" }: { className?: string; color?: string }) {
  return (
    <svg width="8" height="8" viewBox="0 0 8 8" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <circle cx="4" cy="4" r="3" fill={color}/>
    </svg>
  );
}

export function FromDotIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <circle cx="5" cy="5" r="3.5" stroke="#e8a63c" strokeWidth="1.5"/>
    </svg>
  );
}

export function ToDotIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <circle cx="5" cy="5" r="3.5" stroke="#c0392b" strokeWidth="1.5"/>
    </svg>
  );
}

export function GooglePayIcon({ className = "" }: { className?: string }) {
  return (
    <div className={`bg-white rounded-[8px] w-[32px] h-[32px] flex items-center justify-center ${className}`}>
      <span className="text-[7px] font-bold leading-none">
        <span className="text-[#4285f4]">G</span>
        <span className="text-[#555] font-normal">Pay</span>
      </span>
    </div>
  );
}

export function ApplePayIcon({ className = "" }: { className?: string }) {
  return (
    <div className={`bg-black rounded-[8px] w-[32px] h-[32px] flex items-center justify-center ${className}`}>
      <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11.5 5.5C10.5 4.5 9.5 4.8 9 5C8.5 5.2 8 5.3 7 5C6 4.7 5 5 4.5 5.5C3.5 6.5 3.5 9 5 11.5C5.5 12.5 6.5 13.5 7 13.5C7.5 13.5 8 13 8.5 13C9 13 9.5 13.5 10 13.5C10.5 13.5 11 12.5 11.5 11.5C12 10.5 12.5 7 11.5 5.5Z" fill="white"/>
        <path d="M9 2C9.5 1.3 10 1 10 1C10 1 10 2 9.5 2.8C9 3.5 8.5 4 8 4C8 4 7.8 3.5 9 2Z" fill="white"/>
      </svg>
    </div>
  );
}

export function CreditCardIcon({ className = "" }: { className?: string }) {
  return (
    <div className={`bg-cream-200 rounded-[8px] w-[32px] h-[32px] flex items-center justify-center ${className}`}>
      <svg width="16" height="13" viewBox="0 0 16 13" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="0.5" y="0.5" width="15" height="12" rx="2" stroke="#6b6760" strokeWidth="1"/>
        <path d="M0.5 4.5H15.5" stroke="#6b6760" strokeWidth="1"/>
        <rect x="2.5" y="7.5" width="4" height="1.5" rx="0.5" fill="#6b6760"/>
      </svg>
    </div>
  );
}

export function SwapIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M11 2L13 4L11 6" stroke="#6b6760" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M3 4H13" stroke="#6b6760" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M5 14L3 12L5 10" stroke="#6b6760" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M13 12H3" stroke="#6b6760" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  );
}

export function LiveDotIcon({ className = "" }: { className?: string }) {
  return (
    <span className={`relative flex h-[8px] w-[8px] ${className}`}>
      <span className="absolute inset-0 rounded-full bg-success opacity-30 scale-[2]" />
      <span className="relative rounded-full bg-success h-[8px] w-[8px]" />
    </span>
  );
}

export function CloseIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M4 4L12 12M12 4L4 12" stroke="#6b6760" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}
