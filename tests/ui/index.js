casper.test.begin('Test base site', {
    test: function(test) {
        helpers.startCasper();

        helpers.waitForPageLoaded(function() {
            test.assertTitle('Firefox Marketplace');
            test.assertVisible('#global-header');
            test.assertVisible('.feed-home');
            test.assertDoesntExist('.mkt-tile .tray');
            test.assertNotVisible('.app-list-filters-expand-toggle');
        });

        helpers.done(test);
    }
});


casper.test.begin('Test footer at tablet width', {
    test: function(test) {
        helpers.startCasper({viewport: 'tablet'});

        helpers.waitForPageLoaded(function() {
            test.assertNotVisible('#site-footer');
            test.assertNotVisible('#newsletter-footer');
        });

        helpers.done(test);
    }
});


casper.test.begin('Test l10n initialized', {
    test: function(test) {
        helpers.startCasper();

        helpers.waitForPageLoaded(function() {
            var lang = casper.evaluate(function() {
                return window.navigator.l10n.language;
            });
            test.assertEquals(lang, 'en-US');
        });

        helpers.done(test);
    }
});


casper.test.begin('Test l10n initialized for non en-US', {
    test: function(test) {
        helpers.startCasper('/?lang=es');

        helpers.waitForPageLoaded(function() {
            var lang = casper.evaluate(function() {
                return window.navigator.l10n.language;
            });
            test.assertEquals(lang, 'es');

            var games = casper.evaluate(function() {
                return window.require('core/l10n').gettext('Games');
            });
            test.assertNotEquals(games, 'Games');
        });

        helpers.done(test);
    }
});

casper.test.begin('Test that the banner is first on desktop', {
    test: function(test) {
        helpers.startCasper({viewport: 'desktop'});

        helpers.waitForPageLoaded(function() {
            test.assertExists('.banners ~ #global-header');
        });

        helpers.done(test);
    },
});
