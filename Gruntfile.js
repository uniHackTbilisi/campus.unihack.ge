module.exports = function(grunt) {
    var live = grunt.option('live') ? true : false;
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        config: grunt.file.readJSON('config.json'),
        connect: {
            server: {
                options: {
                    hostname: '<%= config.web.origin %>',
                    livereload: live,
                    base: '<%= config.build.base %>',
                    port: '<%= config.web.port %>',
                },
            },
            alive: {
                options: {
                    hostname: '<%= config.web.origin %>',
                    port: '<%= config.web.port %>',
                    base: '<%= config.build.base %>',
                    keepalive: true
                }
            }
        },
        compass: {
            build: {
                options: {
                    noLineComments: '<%= config.compass.noLineComments %>',
                    sassDir: '<%= config.compass.sassDir %>',
                    cssDir: '<%= config.compass.cssDir %>',
                    outputStyle: '<%= config.compass.outputStyle %>',
                    fontsDir: '<%= config.compass.fontsDir %>',
                    javascriptsDir: '<%= config.compass.javascriptsDir %>',
                    imagesDir: '<%= config.compass.imagesDir %>',
                    httpPath: '<%= config.compass.httpPath %>'
                }
            }
        },
        slim: {
            build: {
                files: {
                    '<%= config.build.base %>index.html': '<%= config.source.base %>index.slim',
                }
            }
        },
        watch: {
            fonts: {
                files: ['<%= config.source.fonts %>**'],
                tasks: ['copy:fonts']
            },
            fontsBuild: {
                files: ['<%= config.build.fonts %>**'],
                options: {
                    livereload: live,
                }
            },
            images: {
                files: ['<%= config.source.images %>**'],
                tasks: ['copy:images']
            },
            imagesBuild: {
                files: ['<%= config.build.images %>**'],
                options: {
                    livereload: live,
                }
            },
            scripts: {
                files: ['<%= config.source.scripts %>**'],
                tasks: ['copy:scripts']
            },
            scriptsBuild: {
                files: ['<%= config.build.scripts %>**'],
                options: {
                    livereload: live,
                }
            },
            sass: {
                files: ['<%= config.source.sass %>**'],
                tasks: ['compass:build']
            },
            css: {
                files: ['<%= config.build.css %>**'],
                options: {
                    livereload: live,
                }
            },
            slim: {
                files: ['<%= config.source.base %>/*.slim'],
                tasks: ['slim:build']
            },
            html: {
                files: ['<%= config.build.base %>*.html'],
                options: {
                    livereload: live,
                }
            }
        },
        clean: {
            build: {
                src: '<%= config.build.base %> '
            }
        },
        copy: {
            scripts: {
                files: [{
                    expand: true,
                    cwd: '<%= config.source.scripts %>',
                    src: '**',
                    dest: '<%= config.build.scripts %>/'
                }]
            },
            fonts: {
                files: [{
                    expand: true,
                    cwd: '<%= config.source.fonts %>',
                    src: '**',
                    dest: '<%= config.build.fonts %>/'
                }]
            },
            images: {
                files: [{
                    expand: true,
                    cwd: '<%= config.source.images %>',
                    src: '**',
                    dest: '<%= config.build.images %>/'
                }]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-slim');

    grunt.registerTask('default', [
        'clean:build',
        'copy',
        'compass:build',
        'slim:build',
        'connect:server',
        'watch'
    ]);
    grunt.registerTask('look', [
        'connect:server',
        'watch'
    ]);
    grunt.registerTask('server', ['connect:alive']);
};