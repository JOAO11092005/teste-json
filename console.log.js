document.addEventListener('DOMContentLoaded', () => {
    const logContainer = document.getElementById('log-container');
    const commandInput = document.getElementById('commandInput');

    // Função que escreve uma entrada no console visual
    const logToUI = (message, type = 'log') => {
        const entry = document.createElement('div');
        entry.className = `log-entry log-${type}`;

        // Formata objetos e arrays com indentação bonita
        if (typeof message === 'object' && message !== null) {
            try {
                entry.textContent = JSON.stringify(message, null, 2);
            } catch (e) {
                entry.textContent = String(message);
            }
        } else {
            entry.textContent = String(message);
        }

        logContainer.appendChild(entry);
        logContainer.scrollTop = logContainer.scrollHeight;
    };

    // Boas-vindas no console visual
    logToUI('🚀 Bem-vindo ao DevConsole!', 'info');
    logToUI('Digite qualquer código JavaScript abaixo e pressione [Enter] para executar.', 'info');
    logToUI('Use console.log(), console.warn(), console.error() e veja os resultados aqui! 💡', 'info');

    // Executa código JS digitado pelo usuário
    const executeCommand = (command) => {
        if (!command.trim()) return;

        logToUI(command, 'input');

        try {
            const result = eval(command);
            if (result !== undefined) logToUI(result, 'output');
        } catch (err) {
            logToUI(err.message, 'error');
        }
    };

    // Quando o usuário pressiona Enter no input
    commandInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            executeCommand(e.target.value);
            e.target.value = '';
        }
    });

    // Intercepta todos os tipos de console
    const interceptConsole = (type, style) => {
        const original = console[type];
        console[type] = (...args) => {
            original.apply(console, args);
            args.forEach(arg => {
                if (typeof arg === 'object' && arg !== null) {
                    try {
                        logToUI(JSON.stringify(arg, null, 2), style);
                    } catch {
                        logToUI(String(arg), style);
                    }
                } else {
                    logToUI(String(arg), style);
                }
            });
        };
    };

    interceptConsole('log', 'log');
    interceptConsole('info', 'info');
    interceptConsole('warn', 'warn');
    interceptConsole('error', 'error');

    // Captura erros não tratados
    window.addEventListener('error', (event) => {
        logToUI(`Erro global: ${event.message}`, 'error');
    });

    window.addEventListener('unhandledrejection', (event) => {
        logToUI(`Promise rejeitada: ${event.reason}`, 'error');
    });
});
