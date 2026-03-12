export const users = [
    { id: 1, phone: "+998911444567", password: "1", role: "admin", name: "Super Admin", avatar: "SA" },
    { id: 2, phone: "+998 97 701 70 01", password: "2", role: "director", name: "Abdulloh (Rahbar)", avatar: "RA" },
    { id: 3, phone: "+998200144567", password: "3", role: "seller", name: "Bobur (Sotuvchi)", avatar: "SO" },
    { id: 4, phone: "guest", password: "", role: "guest", name: "Mehmon", avatar: "ME" },
];

export let currentUser = null; // Will be set on login

export const branches = [
    { id: 1, name: "Toshkent (Bosh)", location: "Toshkent sh., Chilonzor", productsCount: 458, totalSales: 1250000000, monthSales: 245000000, employees: 12, color: "#00d4aa" },
    { id: 2, name: "Samarqand", location: "Samarqand sh., Registon", productsCount: 324, totalSales: 890000000, monthSales: 178000000, employees: 8, color: "#0ea5e9" },
    { id: 3, name: "Buxoro", location: "Buxoro sh., Markaziy", productsCount: 287, totalSales: 650000000, monthSales: 134000000, employees: 7, color: "#a855f7" },
    { id: 4, name: "Farg'ona", location: "Farg'ona sh., Mustaqillik", productsCount: 195, totalSales: 420000000, monthSales: 89000000, employees: 5, color: "#f97316" },
];

export const categories = [
    { id: 1, name: "Sement", icon: "🧱", count: 12 },
    { id: 2, name: "Armatika", icon: "🔩", count: 8 },
    { id: 3, name: "G'isht", icon: "🏗️", count: 15 },
    { id: 4, name: "Qum", icon: "⛱️", count: 5 },
    { id: 5, name: "Shifer", icon: "🏠", count: 7 },
    { id: 6, name: "Plitka", icon: "🔲", count: 20 },
    { id: 7, name: "Truba", icon: "🔧", count: 10 },
    { id: 8, name: "Bo'yoq", icon: "🎨", count: 18 },
];

export const products = [
    { id: 1, name: "Qizilqum Sement M400", category: "Sement", price: 68000, unit: "tonna", stock: 1250, minStock: 200, branch: "Toshkent", status: "plenty", image: "🧱" },
    { id: 2, name: "Armatika A500 d12", category: "Armatika", price: 14500, unit: "kg", stock: 8500, minStock: 1000, branch: "Toshkent", status: "plenty", image: "🔩" },
    { id: 3, name: "Qizil g'isht 1-sort", category: "G'isht", price: 1200, unit: "dona", stock: 45000, minStock: 5000, branch: "Samarqand", status: "plenty", image: "🏗️" },
    { id: 4, name: "Qurilish qumi", category: "Qum", price: 85000, unit: "m³", stock: 320, minStock: 100, branch: "Toshkent", status: "plenty", image: "⛱️" },
    { id: 5, name: "Shifer 8-to'lqinli", category: "Shifer", price: 52000, unit: "dona", stock: 850, minStock: 200, branch: "Buxoro", status: "plenty", image: "🏠" },
    { id: 6, name: "Keramik plitka 40x40", category: "Plitka", price: 38000, unit: "m²", stock: 2400, minStock: 500, branch: "Toshkent", status: "plenty", image: "🔲" },
    { id: 7, name: "Polipropilen truba d20", category: "Truba", price: 8500, unit: "metr", stock: 150, minStock: 300, branch: "Farg'ona", status: "low", image: "🔧" },
    { id: 8, name: "Fasad bo'yog'i oq", category: "Bo'yoq", price: 125000, unit: "chelak", stock: 45, minStock: 50, branch: "Samarqand", status: "critical", image: "🎨" },
    { id: 9, name: "Sement M500 Premium", category: "Sement", price: 82000, unit: "tonna", stock: 680, minStock: 150, branch: "Toshkent", status: "plenty", image: "🧱" },
    { id: 10, name: "Armatika A400 d10", category: "Armatika", price: 12800, unit: "kg", stock: 3200, minStock: 800, branch: "Buxoro", status: "plenty", image: "🔩" },
];

export const clients = [
    { id: 1, name: "Azizbek Rahmonov", phone: "+998 90 123 45 67", telegram: "@azizbek_r", totalPurchases: 45000000, currentDebt: 5000000, lastPurchase: "2026-03-10" },
    { id: 2, name: "Shaxzod Umidov", phone: "+998 93 456 78 90", telegram: "@shaxzod_u", totalPurchases: 120000000, currentDebt: 25000000, lastPurchase: "2026-03-05" },
    { id: 3, name: "Murod Aliyev", phone: "+998 99 876 54 32", telegram: "@murod_a", totalPurchases: 8500000, currentDebt: 0, lastPurchase: "2026-03-12" },
];

export const clientTransactions = [
    {
        id: 101,
        clientId: 1,
        clientName: "Azizbek Rahmonov",
        products: [
            { name: "Sement M400", qty: 2, price: 680000, unit: "tonna" },
            { name: "G'isht 1-sort", qty: 1000, price: 1200, unit: "dona" }
        ],
        totalAmount: 2560000,
        paidAmount: 2000000,
        debtAmount: 560000,
        date: "2026-03-12",
        reminderDate: "2026-03-25",
        status: "partially_paid"
    }
];

export const sellers = [
    { id: 1, name: "Bobur Aliyev", phone: "+998 91 234 56 78", branch: "Toshkent", totalSales: 450000000, currentDebt: 125000000, rating: 4.8, creditLimit: 200000000, avatar: "BA", salesCount: 234, status: "active" },
    { id: 2, name: "Sardor Rahimov", phone: "+998 93 345 67 89", branch: "Samarqand", totalSales: 380000000, currentDebt: 89000000, rating: 4.5, creditLimit: 150000000, avatar: "SR", salesCount: 198, status: "active" },
    { id: 3, name: "Jasur Toshmatov", phone: "+998 94 456 78 90", branch: "Toshkent", totalSales: 520000000, currentDebt: 210000000, rating: 4.2, creditLimit: 250000000, avatar: "JT", salesCount: 287, status: "warning" },
    { id: 4, name: "Dilshod Kamolov", phone: "+998 90 567 89 01", branch: "Buxoro", totalSales: 290000000, currentDebt: 45000000, rating: 4.9, creditLimit: 100000000, avatar: "DK", salesCount: 156, status: "active" },
    { id: 5, name: "Nodir Saidov", phone: "+998 95 678 90 12", branch: "Farg'ona", totalSales: 180000000, currentDebt: 165000000, rating: 3.2, creditLimit: 180000000, avatar: "NS", salesCount: 89, status: "danger" },
    { id: 6, name: "Rustam Umarov", phone: "+998 97 789 01 23", branch: "Toshkent", totalSales: 610000000, currentDebt: 0, rating: 5.0, creditLimit: 300000000, avatar: "RU", salesCount: 342, status: "active" },
];

export const debts = [
    { id: 1, sellerId: 1, sellerName: "Bobur Aliyev", product: "Sement M400 — 50 tonna", totalAmount: 125000000, paidAmount: 78000000, dueDate: "2026-03-25", status: "active", createdAt: "2026-02-01" },
    { id: 2, sellerId: 3, sellerName: "Jasur Toshmatov", product: "Armatika A500 — 3 tonna", totalAmount: 210000000, paidAmount: 95000000, dueDate: "2026-02-28", status: "overdue", createdAt: "2026-01-15" },
    { id: 3, sellerId: 2, sellerName: "Sardor Rahimov", product: "G'isht 1-sort — 20,000 dona", totalAmount: 89000000, paidAmount: 62000000, dueDate: "2026-04-10", status: "active", createdAt: "2026-02-20" },
    { id: 4, sellerId: 5, sellerName: "Nodir Saidov", product: "Plitka 40x40 — 800 m²", totalAmount: 165000000, paidAmount: 30000000, dueDate: "2026-03-05", status: "overdue", createdAt: "2026-01-10" },
    { id: 5, sellerId: 4, sellerName: "Dilshod Kamolov", product: "Shifer 8-to'lqinli — 200 dona", totalAmount: 45000000, paidAmount: 45000000, dueDate: "2026-03-15", status: "paid", createdAt: "2026-02-05" },
    { id: 6, sellerId: 1, sellerName: "Bobur Aliyev", product: "Qum — 40 m³", totalAmount: 34000000, paidAmount: 20000000, dueDate: "2026-04-01", status: "active", createdAt: "2026-03-01" },
];

export const recentPayments = [
    { id: 1, sellerName: "Bobur Aliyev", amount: 15000000, method: "Naqd", date: "2026-03-12", receivedBy: "Gulnora" },
    { id: 2, sellerName: "Sardor Rahimov", amount: 25000000, method: "Plastik", date: "2026-03-11", receivedBy: "Gulnora" },
    { id: 3, sellerName: "Jasur Toshmatov", amount: 10000000, method: "O'tkazma", date: "2026-03-11", receivedBy: "Shoxrux" },
    { id: 4, sellerName: "Dilshod Kamolov", amount: 20000000, method: "Naqd", date: "2026-03-10", receivedBy: "Gulnora" },
    { id: 5, sellerName: "Nodir Saidov", amount: 5000000, method: "Plastik", date: "2026-03-10", receivedBy: "Shoxrux" },
];

export const weeklyChartData = [
    { day: "Du", value: 45 },
    { day: "Se", value: 62 },
    { day: "Cho", value: 38 },
    { day: "Pa", value: 71 },
    { day: "Ju", value: 55 },
    { day: "Sha", value: 82 },
    { day: "Ya", value: 35 },
];

export const monthlyStats = {
    totalSales: 2540000000,
    todaySales: 45800000,
    totalDebt: 668000000,
    overdueDebt: 375000000,
    productsCount: 1264,
    sellersCount: 6,
    branchesCount: 4,
    paymentsToday: 3,
};

export const aiMessages = [
    { id: 1, role: "assistant", text: "Salom, Direktor! Men sizning AI yordamchingizman. Bugungi holat haqida xabar beraman:", time: "11:00" },
    { id: 2, role: "assistant", text: "⚠️ 2 ta sotuvchining qarz muddati o'tgan:\n\n• Jasur Toshmatov — 115 mln so'm (12 kun kechikish)\n• Nodir Saidov — 135 mln so'm (7 kun kechikish)\n\nUlar bilan bog'lanishni tavsiya qilaman.", time: "11:00" },
    { id: 3, role: "assistant", text: "📊 Bugungi sotuv: 45.8 mln so'm\nKechagidan 12% ko'p — yaxshi natija! 👏\n\nEng ko'p sotilgan: Sement M400 (18 tonna)", time: "11:01" },
];

export const auditLogs = [
    { id: 1, user: "Abdulloh (Rahbar)", action: "Narx o'zgartirildi: Sement M400", time: "11:50", date: "2026-03-12" },
    { id: 2, user: "Sotuvchi Bobur", action: "Tizimga kirdi", time: "09:15", date: "2026-03-12" },
    { id: 3, user: "Admin", action: "Yangi rahbar tayinlandi: Abdulloh", time: "08:00", date: "2026-03-12" },
];

export const tasks = [
    { id: 1, from: "Rahbar", to: "Bobur Aliyev", text: "Jasur Toshmatovning 125 mln qarzini yig'ishni jadallashtiring!", status: "pending", date: "2026-03-12" },
    { id: 2, from: "Rahbar", to: "Sardor Rahimov", text: "Samarqand filialida sement kamaygan, yangi harid qiling.", status: "completed", date: "2026-03-11" },
];

export const creditRequests = [
    { id: 1, client: "Rustam Karimov", amount: 45000000, product: "Armatika 3 tonna", seller: "Bobur Aliyev", status: "pending", date: "2026-03-12" },
    { id: 2, client: "Umar G'ofurov", amount: 12000000, product: "G'isht 10,000 dona", seller: "Jasur", status: "approved", date: "2026-03-11", proof: "shartnoma_scan.pdf" },
];

// System Health for Super Admin
export const systemErrors = [
    { id: 1, type: "API Timeout", status: "Resolved", time: "12.03.2026 10:45", severity: "medium" },
    { id: 2, type: "Database Connection", status: "Active", time: "12.03.2026 09:12", severity: "high" },
    { id: 3, type: "Push Notification Failure", status: "Pending", time: "11.03.2026 23:20", severity: "low" },
];

export const appUpdates = [
    { id: 1, title: "v1.2.0 Yangilanishi", date: "10.03.2026", text: "Yangi AI tahlil tizimi ishga tushirildi." },
    { id: 2, title: "Server Profilaktikasi", date: "05.03.2026", text: "Tizim tezligi 2 barobar oshirildi." },
];

export const adminStats = {
    serverLoad: "45%",
    databaseSize: "1.2 GB",
    activeUsers: 84,
    uptime: "99.9%"
};

export const aiTelemetry = {
    modelAccuracy: "96.4%",
    avgProcessTime: "1.2s",
    dataAnalyzed: "15,420 row",
    tokensUsed: "425K",
    insightsToday: [
        { id: 1, category: "Savdo", insight: "Sement savdosi keyingi haftada 15% oshishi kutilmoqda.", priority: "high" },
        { id: 2, category: "Qarzlar", insight: "Filiallardagi qarzlar yig'ish tezligi 5% sekinlashgan.", priority: "medium" },
        { id: 3, category: "Baza", insight: "Mijozlar bazasida 12 ta dublikat raqamlar aniqlandi.", priority: "low" }
    ]
};

// Helper: format number to readable Uzbek format
export function formatMoney(amount) {
    if (amount >= 1000000000) {
        return (amount / 1000000000).toFixed(1) + " mlrd";
    }
    if (amount >= 1000000) {
        return (amount / 1000000).toFixed(0) + " mln";
    }
    if (amount >= 1000) {
        return (amount / 1000).toFixed(0) + " ming";
    }
    return amount.toString();
}

export function formatFullMoney(amount) {
    return amount.toLocaleString("uz-UZ") + " so'm";
}

export function formatDate(dateStr) {
    const date = new Date(dateStr);
    const months = ["Yan", "Fev", "Mar", "Apr", "May", "Iyun", "Iyul", "Avg", "Sen", "Okt", "Noy", "Dek"];
    return `${date.getDate()} ${months[date.getMonth()]}`;
}

export function getDaysUntil(dateStr) {
    const now = new Date("2026-03-12");
    const due = new Date(dateStr);
    const diff = Math.ceil((due - now) / (1000 * 60 * 60 * 24));
    return diff;
}
