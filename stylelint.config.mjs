export default {
    extends: ['stylelint-config-standard-scss'],
    rules: {
        'selector-class-pattern': [
            '^[a-z][a-z0-9]*(?:-[a-z0-9]+)*(?:__(?:[a-z0-9]+(?:-[a-z0-9]+)*))?(?:--(?:[a-z0-9]+(?:-[a-z0-9]+)*))?$',
            {
                resolveNestedSelectors: true,
            },
        ],
    },
    overrides: [
        {
            files: ['src/normalize.scss'],
            rules: {
                'declaration-block-no-shorthand-property-overrides': null,
            },
        },
    ],
};
