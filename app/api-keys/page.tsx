'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Key, Copy, Trash2, Eye, EyeOff, Plus, Check } from 'lucide-react';

interface ApiKey {
    id: string;
    name: string;
    key: string;
    createdAt: string;
}

export default function ApiKeysPage() {
    const [apiKeys, setApiKeys] = useState<ApiKey[]>(() => {
        if (typeof window !== 'undefined') {
            const storedKeys = localStorage.getItem('apiKeys');
            return storedKeys ? JSON.parse(storedKeys) : [];
        }
        return [];
    });
    const [newKeyName, setNewKeyName] = useState('');
    const [newKeyValue, setNewKeyValue] = useState('');
    const [visibleKeys, setVisibleKeys] = useState<Set<string>>(new Set());
    const [copiedKey, setCopiedKey] = useState<string | null>(null);
    const [error, setError] = useState('');



    // Save API keys to localStorage whenever they change
    useEffect(() => {
        if (apiKeys.length > 0) {
            localStorage.setItem('apiKeys', JSON.stringify(apiKeys));
        }
    }, [apiKeys]);

    const handleAddKey = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!newKeyName.trim() || !newKeyValue.trim()) {
            setError('Please fill in both fields');
            return;
        }

        const newKey: ApiKey = {
            id: Date.now().toString(),
            name: newKeyName.trim(),
            key: newKeyValue.trim(),
            createdAt: new Date().toISOString(),
        };

        setApiKeys([...apiKeys, newKey]);
        setNewKeyName('');
        setNewKeyValue('');
    };

    const handleDeleteKey = (id: string) => {
        setApiKeys(apiKeys.filter(key => key.id !== id));
        if (apiKeys.length === 1) {
            localStorage.removeItem('apiKeys');
        }
    };

    const toggleKeyVisibility = (id: string) => {
        const newVisibleKeys = new Set(visibleKeys);
        if (newVisibleKeys.has(id)) {
            newVisibleKeys.delete(id);
        } else {
            newVisibleKeys.add(id);
        }
        setVisibleKeys(newVisibleKeys);
    };

    const copyToClipboard = (key: string, id: string) => {
        navigator.clipboard.writeText(key);
        setCopiedKey(id);
        setTimeout(() => setCopiedKey(null), 2000);
    };

    const maskKey = (key: string) => {
        if (key.length <= 8) return '••••••••';
        return key.substring(0, 4) + '••••••••' + key.substring(key.length - 4);
    };

    return (
        <div className="w-full h-screen overflow-y-auto bg-linear-to-br from-orange-50 via-blue-50 to-purple-50">
            <div className="w-full max-w-6xl mx-auto px-6 py-6 pt-20 pb-12">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-8"
                >
                    <div className="flex flex-col items-center gap-3 mb-2">
                        <div>
                            <h1 className="text-4xl font-bold bg-linear-to-r from-orange-600 to-purple-600 bg-clip-text text-transparent">
                                API Keys Management
                            </h1>
                        </div>
                    </div>
                </motion.div>

                {/* Add New Key Form */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-8 mb-8 border border-white/20"
                >
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                        <Plus className="w-6 h-6 text-orange-600" />
                        Add New API Key
                    </h2>
                    <form onSubmit={handleAddKey} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="keyName" className="block text-sm font-medium text-gray-700 mb-2">
                                    Key Name
                                </label>
                                <input
                                    type="text"
                                    id="keyName"
                                    value={newKeyName}
                                    onChange={(e) => setNewKeyName(e.target.value)}
                                    placeholder="e.g., OpenAI API Key"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none bg-white/50"
                                />
                            </div>
                            <div>
                                <label htmlFor="keyValue" className="block text-sm font-medium text-gray-700 mb-2">
                                    API Key
                                </label>
                                <input
                                    type="password"
                                    id="keyValue"
                                    value={newKeyValue}
                                    onChange={(e) => setNewKeyValue(e.target.value)}
                                    placeholder="sk-..."
                                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none bg-white/50"
                                />
                            </div>
                        </div>
                        {error && (
                            <motion.p
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-red-500 text-sm"
                            >
                                {error}
                            </motion.p>
                        )}
                        <motion.button
                            type="submit"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full md:w-auto px-8 py-3 bg-linear-to-r from-orange-600 to-purple-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all"
                        >
                            Add API Key
                        </motion.button>
                    </form>
                </motion.div>

                {/* API Keys Table */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl overflow-hidden border border-white/20"
                >
                    <div className="p-8">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                            Stored API Keys ({apiKeys.length})
                        </h2>

                        {apiKeys.length === 0 ? (
                            <div className="text-center py-16">
                                <Key className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                <p className="text-gray-500 text-lg">No API keys stored yet</p>
                                <p className="text-gray-400 text-sm mt-2">Add your first API key using the form above</p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-gray-200">
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Name</th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">API Key</th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Created</th>
                                            <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <AnimatePresence mode="popLayout">
                                            {apiKeys.map((apiKey, index) => (
                                                <motion.tr
                                                    key={apiKey.id}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: 20 }}
                                                    transition={{ duration: 0.3, delay: index * 0.05 }}
                                                    className="border-b border-gray-100 hover:bg-blue-50/50 transition-colors"
                                                >
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                                            <span className="font-medium text-gray-800">{apiKey.name}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <code className="text-sm font-mono text-gray-600 bg-gray-100 px-3 py-1 rounded-lg">
                                                            {visibleKeys.has(apiKey.id) ? apiKey.key : maskKey(apiKey.key)}
                                                        </code>
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-gray-600">
                                                        {new Date(apiKey.createdAt).toLocaleDateString()}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center justify-end gap-2">
                                                            <motion.button
                                                                whileHover={{ scale: 1.1 }}
                                                                whileTap={{ scale: 0.9 }}
                                                                onClick={() => toggleKeyVisibility(apiKey.id)}
                                                                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                                                                title={visibleKeys.has(apiKey.id) ? 'Hide key' : 'Show key'}
                                                            >
                                                                {visibleKeys.has(apiKey.id) ? (
                                                                    <EyeOff className="w-5 h-5" />
                                                                ) : (
                                                                    <Eye className="w-5 h-5" />
                                                                )}
                                                            </motion.button>
                                                            <motion.button
                                                                whileHover={{ scale: 1.1 }}
                                                                whileTap={{ scale: 0.9 }}
                                                                onClick={() => copyToClipboard(apiKey.key, apiKey.id)}
                                                                className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-100 rounded-lg transition-colors"
                                                                title="Copy to clipboard"
                                                            >
                                                                {copiedKey === apiKey.id ? (
                                                                    <Check className="w-5 h-5 text-green-600" />
                                                                ) : (
                                                                    <Copy className="w-5 h-5" />
                                                                )}
                                                            </motion.button>
                                                            <motion.button
                                                                whileHover={{ scale: 1.1 }}
                                                                whileTap={{ scale: 0.9 }}
                                                                onClick={() => handleDeleteKey(apiKey.id)}
                                                                className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                                                                title="Delete key"
                                                            >
                                                                <Trash2 className="w-5 h-5" />
                                                            </motion.button>
                                                        </div>
                                                    </td>
                                                </motion.tr>
                                            ))}
                                        </AnimatePresence>
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </motion.div>

                {/* Info Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="mt-8 bg-linear-to-r from-orange-100 to-purple-100 rounded-2xl p-6 border border-blue-200"
                >
                    <h3 className="font-semibold text-gray-800 mb-2">🔒 Security Note</h3>
                    <p className="text-sm text-gray-700">
                        API keys are stored locally in your browser&apos;s localStorage. They are not sent to any server.
                        Make sure to keep your keys secure and never share them publicly.
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
