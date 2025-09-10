'use client';
import { motion } from "framer-motion";
export default function LogoMark(){
  return (
    <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-400 to-emerald-700 border border-white/20 shadow-lg flex items-center justify-center">
      <motion.div initial={{scale:0.9, opacity:0}} animate={{scale:1, opacity:1}} transition={{duration:0.6}} className="text-black/80 font-extrabold">GD</motion.div>
      <div className="absolute -bottom-1 -right-1 bg-black/70 text-yellow-300 text-[9px] px-1.5 py-0.5 rounded-md border border-white/10">1447H</div>
    </div>
  );
}
