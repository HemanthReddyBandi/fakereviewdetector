const mockData = {
    trustScore: 0,
    totalReviews: 0,
    suspiciousReviews: "0%",
    verifiedPurchases: "0%",
    patternData: {
        dates: ['2025-03-20', '2025-03-21', '2025-03-22', '2025-03-23', '2025-03-24', '2025-03-25', '2025-03-26'],
        values: []
    },
    credibilityData: [],
    sentimentAnalysis: { positive: 0, neutral: 0, negative: 0 }
};

// Function to generate random data
function generateDynamicData() {
    mockData.totalReviews = Math.floor(Math.random() * 101) + 400;
    mockData.trustScore = Math.floor(Math.random() * 101);
    mockData.suspiciousReviews = Math.floor(Math.random() * 20) + "%";
    mockData.verifiedPurchases = Math.floor(Math.random() * 100) + "%";

    mockData.sentimentAnalysis = {
        positive: Math.floor(Math.random() * 70),
        neutral: Math.floor(Math.random() * 20),
        negative: Math.floor(Math.random() * 10)
    };

    mockData.patternData.values = mockData.patternData.dates.map(() => Math.floor(Math.random() * 100));

    const highlyCredible = Math.floor(Math.random() * 70) + 20;
    const moderate = Math.floor(Math.random() * (90 - highlyCredible));
    const lowCredibility = 100 - (highlyCredible + moderate);

    mockData.credibilityData = [
        { value: highlyCredible, name: 'Highly Credible' },
        { value: moderate, name: 'Moderate' },
        { value: lowCredibility, name: 'Low Credibility' }
    ];
}

// Function to start analysis
function startAnalysis() {
    const urlInput = document.getElementById('urlInput');
    const errorMessage = document.getElementById("error-message");

    if (!urlInput.value.trim()) {
        errorMessage.textContent = "Please enter a valid product URL!";
        errorMessage.style.display = "block";
        urlInput.style.border = "2px solid red";
        return;
    }

    // Hide error message if the input is valid
    errorMessage.style.display = "none";
    urlInput.style.border = "2px solid green";

    document.getElementById('analysisProgress').classList.remove('hidden');

    // Simulate processing time
    setTimeout(() => {
        generateDynamicData();
        updateHTML();
        document.getElementById('results').classList.remove('hidden');
        initCharts();
        document.getElementById('analysisProgress').classList.add('hidden');
    }, 6000);
}

// Function to update HTML dynamically
function updateHTML() {
    document.getElementById('trustScoreValue').textContent = mockData.trustScore;
    document.getElementById('totalReviewsValue').textContent = mockData.totalReviews;
    document.getElementById('suspiciousReviewsValue').textContent = mockData.suspiciousReviews;
    document.getElementById('verifiedPurchasesValue').textContent = mockData.verifiedPurchases;

    document.getElementById('positiveSentiment').textContent = mockData.sentimentAnalysis.positive + '%';
    document.getElementById('neutralSentiment').textContent = mockData.sentimentAnalysis.neutral + '%';
    document.getElementById('negativeSentiment').textContent = mockData.sentimentAnalysis.negative + '%';
}

// Function to validate URL input
function validateURL(input) {
    const urlPattern = /^(https?:\/\/)[^\s$.?#].[^\s]*$/;
    const errorMessage = document.getElementById("error-message");

    if (input && urlPattern.test(input.value)) {
        input.style.border = "2px solid green";
        errorMessage.style.display = "none";
    } else {
        input.style.border = "2px solid red";
        errorMessage.style.display = "block";
    }
}

// Function to initialize charts
function initCharts() {
    const trustScoreChart = echarts.init(document.getElementById('trustScore'));
    const patternChart = echarts.init(document.getElementById('patternChart'));
    const credibilityChart = echarts.init(document.getElementById('credibilityChart'));

    trustScoreChart.setOption({
        series: [{
            type: 'gauge',
            data: [{ value: mockData.trustScore }]
        }]
    });

    patternChart.setOption({
        xAxis: { type: 'category', data: mockData.patternData.dates },
        yAxis: { type: 'value' },
        series: [{ type: 'line', data: mockData.patternData.values }]
    });

    credibilityChart.setOption({
        series: [{ type: 'pie', data: mockData.credibilityData }]
    });
}

// Scroll-to-top button functionality
window.onscroll = function() {
    let scrollBtn = document.getElementById("scrollToTopBtn");
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        scrollBtn.classList.add("show");
    } else {
        scrollBtn.classList.remove("show");
    }
};

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
}
