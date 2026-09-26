let policyHolders = [];
let payments = [];

document.getElementById("policyForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("holderName").value;
    const policyNumber = document.getElementById("policyNumber").value;
    const premium = document.getElementById("premiumAmount").value;

    policyHolders.push({
        name: name,
        policyNumber: policyNumber,
        premium: premium
    });

    document.getElementById("policyList").innerHTML =
        policyHolders.map(p =>
            <p><b>${p.name}</b> | ${p.policyNumber} | ₹${p.premium}</p>
        ).join("");

    document.getElementById("totalPolicy").innerText = policyHolders.length;

    this.reset();
});

document.getElementById("paymentForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const policy = document.getElementById("paymentPolicy").value;
    const amount = document.getElementById("paymentAmount").value;
    const method = document.getElementById("paymentMethod").value;

    payments.push({
        policy: policy,
        amount: amount,
        method: method
    });

    document.getElementById("paymentHistory").innerHTML =
        payments.map(p =>
            <p>Policy: ${p.policy} | ₹${p.amount} | ${p.method}</p>
        ).join("");

    document.getElementById("totalCollection").innerText =
        "₹" + payments.reduce((sum, p) => sum + Number(p.amount), 0);

    this.reset();
});

function generateReceipt() {
    document.getElementById("receiptArea").innerHTML =
        "<h3>Payment Receipt</h3><p>Receipt generated successfully.</p>";
}
