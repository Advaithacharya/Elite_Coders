document.addEventListener('DOMContentLoaded', () => {
    const roleButtons = document.querySelectorAll('.role-btn');
    
    // Add initial animation delay to buttons
    roleButtons.forEach((button, index) => {
        button.style.animationDelay = `${index * 0.2}s`;
        button.style.opacity = '0';
        button.style.animation = 'fadeIn 0.5s ease-out forwards';
    });
    
    roleButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const role = button.querySelector('span').textContent.toLowerCase();
            
            // Create ripple effect
            const ripple = document.createElement('div');
            ripple.classList.add('ripple');
            
            // Position ripple at click location
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            button.appendChild(ripple);
            
            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 1000);
            
            // Add click animation
            button.style.transform = 'scale(0.95)';
            setTimeout(() => {
                button.style.transform = '';
            }, 200);
            
            // Handle role selection
            if (role === 'admin') {
                window.location.href = 'admin-login.html';
            } else if (role === 'teacher') {
                window.location.href = 'teacher-login.html';
            } else if (role === 'student') {
                window.location.href = 'student-login.html';
            }
        });
        
        // Add hover sound effect
        button.addEventListener('mouseenter', () => {
            const audio = new Audio('data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU');
            audio.play().catch(() => {}); // Ignore errors if sound is blocked
        });
    });
}); 