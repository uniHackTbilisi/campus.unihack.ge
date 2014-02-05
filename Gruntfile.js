module.exports = function(grunt) {
    var live = grunt.option('live') ? true : false;
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        config: grunt.file.readJSON('config.json'),
        secret: grunt.file.readJSON('secret.json'),
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
                    config: '<%= config.compass %>'
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
                files: ['<%= config.source.sass %>**/**/**'],
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
        },
        sftp: {
          deploy: {
            files: {
              "./": "<%= config.build.base%>**"
            },
            options: {
              path: '<%= secret.path %>',
              host: '<%= secret.host %>',
              username: '<%= secret.username %>',
              password: '<%= secret.password %>',
              port : '<%= secret.port %>',
              srcBasePath: '<%= config.build.base%>',
              createDirectories: true,
              showProgress: true
            }
          }
        },
    });

    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-slim');
    grunt.loadNpmTasks('grunt-ssh');

    grunt.registerTask('deploy', [
        'build',
        'sftp:deploy'
    ]);

    grunt.registerTask('build', [
        'clean:build',
        'copy',
        'compass:build',
        'slim:build',
    ]);
    grunt.registerTask('default', [
        'build',
        'look'
    ]);
    grunt.registerTask('look', [
        'connect:server',
        'watch'
    ]);
    grunt.registerTask('server', ['connect:alive']);
};