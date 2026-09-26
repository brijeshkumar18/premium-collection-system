// Premium Collection System - JavaScript

let policyHolders = [];
let payments = [];

// Add Policy Holder
function addPolicyHolder() {
    const name = document.getElementById("holderName").value.trim();
    const policyNumber = document.getElementById("policyNumber").value.trim();
    const premiumAmount = Number(document.getElementById("premiumAmount").value);

    if (!name || !policyNumber || !premiumAmount) {
        alert("Please enter all policy holder details.");
        return;
    }

    const existingPolicy = policyHolders.find(
        holder => holder.policyNumber === policyNumber
    );

    if (existingPolicy) {
        alert("Policy number already exists.");
        return;
    }

    policyHolders.push({
        name: name,
        policyNumber: policyNumber,
        premiumAmount: premiumAmount
    });

    document.getElementById("holderName").value = "";
    document.getElementById("policyNumber").value = "";
    document.getElementById("premiumAmount").value = "";

    updateDashboard();
    alert("Policy holder added successfully.");
}

// Record Payment
function recordPayment() {
    const policyNumber = document.getElementById("paymentPolicyNumber").value.trim();
    const amount = Number(document.getElementById("paymentAmount").value);
    const method = document.getElementById("paymentMethod").value;

    if (!policyNumber || !amount || !method) {
        alert("Please enter complete payment details.");
        return;
    }

    const holder = policyHolders.find(
        policy => policy.policyNumber === policyNumber
    );

    if (!holder) {
        alert("Policy number not found.");
        return;
    }

    payments.push({
        policyNumber: policyNumber,
        amount: amount,
        method: method,
        date: new Date().toLocaleDateString()
    });

    document.getElementById("paymentPolicyNumber").value = "";
    document.getElementById("paymentAmount").value = "";
    document.getElementById("paymentMethod").value = "";

    updateDashboard();
    updatePaymentHistory();

    alert("Payment recorded successfully.");
}

// Generate Receipt
function generateReceipt() {
    if (payments.length === 0) {
        alert("No payment available for receipt generation.");
        return;
    }

    const payment = payments[payments.length - 1];

    const receiptArea = document.getElementById("receiptArea");

    receiptArea.innerHTML = `
        <div class="card">
            <h3>Payment Receipt</h3>
            <p><strong>Policy Number:</strong> ${payment.policyNumber}</p>
            <p><strong>Payment Amount:</strong> ₹${payment.amount}</p>
            <p><strong>Payment Method:</strong> ${payment.method}</p>
            <p><strong>Date:</strong> ${payment.date}</p>
            <p><strong>Status:</strong> Paid</p>
        </div>
    `;
}

// Update Dashboard
function updateDashboard() {
    const totalHolders = document.getElementById("totalHolders");
    const totalCollection = document.getElementById("totalCollection");
    const pendingPayments = document.getElementById("pendingPayments");
    const upcomingDues = document.getElementById("upcomingDues");

    if (totalHolders) {
        totalHolders.textContent = policyHolders.length;
    }

    const collection = payments.reduce(
        (total, payment) => total + payment.amount,
        0
    );

    if (totalCollection) {
        totalCollection.textContent = "₹" + collection;
    }

    if (pendingPayments) {
        pendingPayments.textContent =
            Math.max(policyHolders.length - payments.length, 0);
    }

    if (upcomingDues) {
        upcomingDues.textContent =
            Math.max(policyHolders.length - payments.length, 0);
    }
}

// Payment History
function updatePaymentHistory() {
    const history = document.getElementById("paymentHistory");

    if (!history) return;

    if (payments.length === 0) {
        history.innerHTML = "<p>No payment history available.</p>";
        return;
    }

    history.innerHTML = `
        <table>
            <thead>
                <tr>
                    <th>Policy Number</th>
                    <th>Amount</th>
                    <th>Method</th>
                    <th>Date</th>
                </tr>
            </thead>
            <tbody>
                ${payments.map(payment => `
                    <tr>
                        <td>${payment.policyNumber}</td>
                        <td>₹${payment.amount}</td>
                        <td>${payment.method}</td>
                        <td>${payment.date}</td>
                    </tr>
                `).join("")}
            </tbody>
        </table>
    `;
};

// Load initial data
document.addEventListener("DOMContentLoaded", function () {
    updateDashboard();
    updatePaymentHistory();
});
