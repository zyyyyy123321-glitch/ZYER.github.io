class AIAssistant {
    constructor() {
        this.isOpen = false;
        this.presetQuestions = [
            { question: "你的技能有哪些？", answer: "我精通前端开发（HTML, CSS, JavaScript）、后端开发（Python, Node.js）、人工智能（机器学习、深度学习）等技术栈。" },
            { question: "看看你的作品", answer: "我开发过多个项目，包括AI聊天机器人、数据分析平台、个人博客系统等。您 可以在作品集页面查看详细信息！" },
            { question: "如何联系你？", answer: "您可以通过邮箱 contact@example.com 或社交媒体平台与我联系。我会尽快回复！" },
            { question: "介绍一下自己", answer: "我是一名热爱技术的开发者，专注于AI和Web开发。我喜欢探索新技术，解决有趣的问题，并与他人分享知识。" }
        ];

        this.init();
    }

    init() {
        this.createAssistantUI();
        this.addEventListeners();
    }

    createAssistantUI() {
        const fab = document.createElement('div');
        fab.className = 'ai-assistant-fab';
        fab.innerHTML = '🤖';
        document.body.appendChild(fab);

        const chatWindow = document.createElement('div');
        chatWindow.className = 'ai-assistant-window';
        chatWindow.innerHTML = `
            <div class="assistant-header">
                <h3>AI 助手</h3>
                <button class="close-btn">×</button>
            </div>
            <div class="assistant-messages"></div>
            <div class="assistant-questions"></div>
        `;
        document.body.appendChild(chatWindow);

        const questionsContainer = chatWindow.querySelector('.assistant-questions');
        this.presetQuestions.forEach((item, index) => {
            const questionBtn = document.createElement('button');
            questionBtn.className = 'preset-question';
            questionBtn.textContent = item.question;
            questionBtn.onclick = () => this.handleQuestion(index);
            questionsContainer.appendChild(questionBtn);
        });

        this.addMessage('你好！我是AI助手，有什么可以帮您的吗？', 'bot');
    }

    addEventListeners() {
        const fab = document.querySelector('.ai-assistant-fab');
        const closeBtn = document.querySelector('.close-btn');

        fab.addEventListener('click', () => this.toggle());
        closeBtn.addEventListener('click', () => this.toggle());
    }

    toggle() {
        const chatWindow = document.querySelector('.ai-assistant-window');
        this.isOpen = !this.isOpen;
        this.isOpen ? chatWindow.classList.add('open') : chatWindow.classList.remove('open');
    }

    addMessage(text, sender) {
        const messagesContainer = document.querySelector('.assistant-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;

        if (sender === 'bot') {
            this.typeText(messageDiv, text);
        } else {
            messageDiv.textContent = text;
        }

        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    typeText(element, text) {
        let index = 0;
        const cursor = document.createElement('span');
        cursor.className = 'typing-cursor';
        cursor.textContent = '▋';
        element.appendChild(cursor);

        const interval = setInterval(() => {
            if (index < text.length) {
                cursor.before(text.charAt(index));
                index++;
            } else {
                clearInterval(interval);
                cursor.remove();
            }
        }, 30);
    }

    handleQuestion(index) {
        const preset = this.presetQuestions[index];
        this.addMessage(preset.question, 'user');
        setTimeout(() => this.addMessage(preset.answer, 'bot'), 500);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new AIAssistant();
});