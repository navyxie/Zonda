CONFIGURE = @./tool/configure.sh

build:
	$(CONFIGURE)
	@./tool/build.framework.sh
	@./tool/build.app.sh
	@./tool/compile.less.sh

install:
	@./tool/deploy.app.sh

config:
	$(CONFIGURE)

update-vendor:
	$(CONFIGURE)
	@./tool/update.vendor.sh

clean:
	@./tool/clean.sh

deploy:
	@./tool/deploy.fragment.sh
