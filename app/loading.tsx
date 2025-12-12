"use client"

import { motion } from "framer-motion"

export default function Loading() {
    return (
        <div className="flex h-screen w-full items-center justify-center bg-background/50 backdrop-blur-sm">
            <motion.div
                className="relative flex h-24 w-24 items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <motion.div
                    className="absolute h-full w-full rounded-full border-4 border-primary/20"
                />
                <motion.div
                    className="absolute h-full w-full rounded-full border-4 border-t-primary"
                    animate={{ rotate: 360 }}
                    transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                />
                <motion.div
                    className="h-12 w-12 rounded-full bg-primary/10"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            </motion.div>
        </div>
    )
}
