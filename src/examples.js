const componentDataSelect = [
    {
        endpoint: 'service',
        select: () => null,
        children: [
            {
                endpoint: 'endpoint',
                select: () => null,
                children: []
            }
        ]
    }
];

const componentProp = {
    service: {
        data: {},
        create: () => {},
        update: () => {},
        invalidate: () => {}
    },
    service_endpoint: {
        data: {},
        create: () => {},
        update: () => {},
        invalidate: () => {}
    }
};

const store = {
    redest: {
        service: {
            entities: [],
            meta: {},
            children: {
                endpoint: {
                    entities: [],
                    meta: {}
                }
            }
        }
    }
};