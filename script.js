// Premium Collection System - JavaScript Functionality

let policies = JSON.parse(localStorage.getItem("policies")) || [];
let payments = JSON.parse(localStorage.getItem("payments")) || [];

// Add Policy Holder
document.getElementById("policyForm")?.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("holderName").value;
    const policyNumber = document.getElementById("policyNumber").value;
    const premiumAmount = document.getElementById("premiumAmount").value;

    const policy = {
        id: Date.now(),
        name: name,
        policyNumber: policyNumber,
        premiumAmount: Number(premiumAmount)
    };

    policies.push(policy);
    localStorage.setItem("policies", JSON.stringify(policies));

    alert("Policy holder added successfully!");

    this.reset();
    updateDashboard();
    displayPolicies();
});

// Record Payment
document.getElementById("paymentForm")?.addEventListener("submit", function (event) {
    event.preventDefault();

    const policyNumber = document.getElementById("paymentPolicy").value;
    const amount = Number(document.getElementById("paymentAmount").value);
    const method = document.getElementById("paymentMethod").value;
