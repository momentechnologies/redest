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
        data: {
            id: 1,
            title: 123,
            endpointIds: [2, 132, 981],
            endpoint: {
                data: {
                    id: 341
                },
                create: () => {}, // when you use this create it will automatically use the id of the parent service
                update: () => {},
                invalidate: () => {}
            }
        },
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