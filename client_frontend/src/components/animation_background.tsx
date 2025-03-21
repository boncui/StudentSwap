import { motion } from "framer-motion"


export default function Animation() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
            className="absolute -top-1/2 -left-1/2 w-full h-full bg-primary/10 dark:bg-primary/20 rounded-full"
            animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 90, 0],
            }}
            transition={{
                duration: 20,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
            }}
            />
            <motion.div
            className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-secondary/10 dark:bg-secondary/20 rounded-full"
            animate={{
                scale: [1, 1.2, 1],
                rotate: [0, -90, 0],
            }}
            transition={{
                duration: 25,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
            }}
            />
            <motion.div
            className="absolute top-1/4 left-1/4 w-12 h-12 bg-primary/20 dark:bg-primary/30 rounded-full"
            animate={{
                y: [0, -20, 0],
                x: [0, 20, 0],
            }}
            transition={{
                duration: 5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
            }}
            />
            <motion.div
            className="absolute bottom-1/4 right-1/4 w-8 h-8 bg-secondary/20 dark:bg-secondary/30 rounded-full"
            animate={{
                y: [0, 30, 0],
                x: [0, -30, 0],
            }}
            transition={{
                duration: 7,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
            }}
            />
        </div>
    )
}
