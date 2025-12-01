"use client";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export function Modal({ isOpen, onClose, title, message, icon, actions }) {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Background Overlay */}
                    <motion.div
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />

                    {/* Modal Container */}
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="relative w-full max-w-md rounded-2xl bg-white shadow-xl overflow-hidden"
                            initial={{ scale: 0.9, y: 20, opacity: 0 }}
                            animate={{
                                scale: 1,
                                y: 0,
                                opacity: 1,
                                transition: { type: "spring", damping: 25, stiffness: 300 },
                            }}
                            exit={{ scale: 0.95, y: 20, opacity: 0, transition: { duration: 0.2 } }}
                        >
                            <div className="p-6">
                                {/* Header */}
                                <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-r from-green-50 to-[#DEFCE4]" />

                                <div className="relative flex justify-between items-center mb-6">
                                    {/* Title & Icon */}
                                    <motion.div
                                        className="flex items-center"
                                        initial={{ x: -10, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1, transition: { delay: 0.1 } }}
                                    >
                                        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-green-100 mr-3">
                                            {icon}
                                        </div>
                                        <h2 className="text-xl font-bold text-green-800">
                                            {title}
                                        </h2>
                                    </motion.div>

                                    {/* Close Button */}
                                    <motion.button
                                        whileHover={{ scale: 1.1, rotate: 90 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={onClose}
                                        className="h-8 w-8 rounded-full flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                                        aria-label="Close Modal"
                                    >
                                        <X className="h-5 w-5" />
                                    </motion.button>
                                </div>

                                {/* Message */}
                                {message && (
                                    <motion.div
                                        className="text-center mb-6"
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1, transition: { delay: 0.3 } }}
                                    >
                                        <p className="text-gray-600">{message}</p>
                                    </motion.div>
                                )}

                                {/* Actions (Now in the same row) */}
                                {actions?.length > 0 && (
                                    <div className="flex justify-between space-x-3">
                                        {actions.map((action, index) => (
                                            <motion.button
                                                key={index}
                                                initial={{ y: 20, opacity: 0 }}
                                                animate={{
                                                    y: 0,
                                                    opacity: 1,
                                                    transition: { delay: 0.4 + index * 0.1 },
                                                }}
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                onClick={action.onClick}
                                                className={`flex-1 py-3 px-4 text-center ${
                                                    action.variant === "primary"
                                                        ? "bg-gradient-to-r from-[#04A42A] to-green-600 text-white"
                                                        : "border border-gray-400 text-gray-600 bg-transparent"
                                                } font-medium rounded-lg transition-all flex items-center justify-center`}
                                            >
                                                {action.icon && (
                                                    <span className="mr-2">{action.icon}</span>
                                                )}
                                                {action.label}
                                            </motion.button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
