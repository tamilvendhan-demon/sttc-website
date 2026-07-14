@echo off
set DIR=%~dp0
if "%DIR%"=="" set DIR=.\
set APP_HOME=%DIR%
set CLASSPATH=%APP_HOME%gradle
apper
apper.jar
if not exist "%CLASSPATH%" (
    echo Gradle wrapper not found. Please run: flutter pub get
    exit /b 1
)
java -classpath "%CLASSPATH%" org.gradle.wrapper.GradleWrapperMain %*
