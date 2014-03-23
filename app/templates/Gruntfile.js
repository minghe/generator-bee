module.exports = function (grunt) {

    grunt.initConfig({
        // 指定打包目录
        buildBase: 'build',
        //源码目录
        srcBase: 'src',

        clean: {
            build: [
                '<%=buildBase %>'
            ]
        },

        kmc: {
            options: {
                depFilePath: '<%=buildBase %>/deps.js',
                comboOnly:true,
                fixModuleName:true,
                comboMap:true,
                packages: [
                    {
                        name: '<%=name%>',
                        path: '<%=srcBase %>',
                        charset:'utf-8',
                        ignorePackageNameInUri:true

                    }
                ]
            },
            main: {
                files: [
                    {
                        expand: true,
                        cwd: '<%=srcBase %>',
                        src: [ '**/*.js' ],
                        dest: '<%=buildBase %>'
                    }
                ]
            }
        },

        copy: {
            all: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= srcBase %>',
                        src: ['**/*.js','**/*.css', '!**/*.less.css', '**/*.eot', '**/*.svg', '**/*.ttf', '**/*.woff'],
                        dest: '<%=buildBase %>'
                    }
                ]
            }

        },
        less: {
            options: {
                paths: ['<%= srcBase %>']
            },

            dev: {
                options: {
                    sourceMap: true,
                    outputSourceFiles: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= srcBase %>',
                    dest: '<%= srcBase %>',
                    src: ['**/*.less', '!**/_*.less', '!bower_components/**'],
                    ext: '.css'
                }]
            },

            build: {
                files: [{
                    expand: true,
                    cwd: '<%= srcBase %>',
                    dest: '<%=buildBase %>',
                    src: ['**/*.less'],
                    ext: '.css'
                }]
            }
        },

        cssmin: {
            build: {
                expand: true,
                cwd: '<%=buildBase %>',
                src: ['**/*.css', '!**/*-min.css'],
                dest: '<%=buildBase %>',
                ext: '-min.css'
            }
        },

        uglify: {
            options: {
                mangle: {
                    except: ['KISSY']
                },
                preserveComments: 'some',
                'ascii-only': true
            },
            build: {
                files: [{
                    expand: true,
                    cwd: '<%=buildBase %>',
                    src: ['**/*.js', '!*-min.js'],
                    dest: '<%=buildBase %>',
                    ext: '-min.js'
                }]
            }
        },

        watch: {
            less: {
                files: ['<%= srcBase %>/**/*.less'],
                tasks: ['less:dev']
            },
            kmc: {
                files: ['<%= srcBase %>/**/*.js'],
                tasks: ['kmc:main']
            }
        }
    });

    var GRUNT_BEGIN_TS = Date.now();
    var timeLine = [];

    grunt.registerTask('timer', 'Log time spent', function(name){
        if (name !== 'end') {
            timeLine.push({
                task: name,
                ts: Date.now()
            });
        }

        if (name === 'end') {
            timeLine.reduce(function(prev, current){
                var taskName = current.task.replace(/--/g, ':');
                console.log('   ' + taskName + '\t ' + (current.ts - prev.ts)/1000+'s');
                return current;
            }, {
                ts: GRUNT_BEGIN_TS
            });
            grunt.log.ok( 'Total took ' + ( Date.now() - GRUNT_BEGIN_TS ) / 1000 + 's' );
        }
    });

    function addTimerTask(tasks){
        tasks =  tasks.reduce(function(prev, current){
            prev.push(current);
            prev.push('timer:'+current.replace(/:/g, '--'));
            return prev;
        }, []);

        tasks.push('timer:end');
        return tasks;
    }

    /**
     * 载入使用到的通过NPM安装的模块
     */
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-kmc');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');


    /**
     * 注册基本任务
     */
    grunt.registerTask('default', addTimerTask(['clean','copy:all','kmc:main','less:dev','less:build', 'cssmin:build', 'uglify:build']));
    grunt.registerTask('style', addTimerTask(['less:dev','less:build', 'cssmin:build']));
    grunt.registerTask('dev', ['watch']);

};
