// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add animation to feature cards on scroll
const featureCards = document.querySelectorAll('.feature-card');
const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

featureCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.6s ease-out';
    observer.observe(card);
});

// Add click animation to CTA button
const ctaButton = document.querySelector('.cta-button');
ctaButton.addEventListener('click', () => {
    ctaButton.style.transform = 'scale(0.95)';
    setTimeout(() => {
        ctaButton.style.transform = 'scale(1)';
    }, 200);
});

document.addEventListener('DOMContentLoaded', () => {
    const chatMessages = document.getElementById('chat-messages');
    const input = document.querySelector('input[type="text"]');
    const sendButton = document.querySelector('button');

    function addMessage(message, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `flex items-start ${isUser ? 'justify-end' : ''} space-x-2`;

        if (!isUser) {
            // AI avatar
            const avatar = document.createElement('div');
            avatar.className = 'w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center';
            avatar.innerHTML = `
                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3c-3.75 0-6.75 2.25-6.75 6.75s3 6.75 6.75 6.75 6.75-2.25 6.75-6.75S15.75 3 12 3zm-1.5 11.25h3"></path>
                </svg>
            `;
            messageDiv.appendChild(avatar);
        }

        const messageContent = document.createElement('div');
        messageContent.className = `${isUser ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800'} rounded-lg p-3 max-w-[80%]`;
        
        const text = document.createElement('p');
        text.textContent = message;
        
        const timestamp = document.createElement('span');
        timestamp.className = `text-xs ${isUser ? 'text-blue-100' : 'text-gray-500'} mt-1 block`;
        timestamp.textContent = new Date().toLocaleTimeString();
        
        messageContent.appendChild(text);
        messageContent.appendChild(timestamp);
        messageDiv.appendChild(messageContent);
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function handleSendMessage() {
        const message = input.value.trim();
        if (message) {
            addMessage(message, true);
            input.value = '';
            
            // Simulate AI response
            setTimeout(() => {
                addMessage('I understand. How can I help you with that?');
            }, 1000);
        }
    }

    // Event listeners
    sendButton.addEventListener('click', handleSendMessage);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    });

    // Add focus to input
    input.focus();
});
