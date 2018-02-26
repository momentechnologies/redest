module.exports = app => {
    app.use('/api/contributers', (req, res) => {
        setTimeout(() => {
            res.json({
                data: [
                    { id: 1, name: 'Max Moeschinger' },
                    { id: 2, name: 'Can be you?' },
                ],
            });
        }, 2000);
    });
};
