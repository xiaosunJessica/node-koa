<script setup lang='ts'>

</script>

<template>
  <main :class="['project-layout']">
    <aside class="aside">
      <div class="side-hd">side-hd</div>
      <div class="side-bd">side-bd</div>
      <div class="side-ft">side-ft</div>
    </aside>
   <div class="breadcrumbs" >
      <div class="page-top">
        <h3 class="current">{{ 'currentPage' }}</h3>
        <div class="version-selector" >
            应用当前版本：
        </div>
      </div>
    </div>
    <div class="main-container">
      <RouterView></RouterView>
    </div>
  </main>
</template>

<style lang='scss' scoped>
  .project-layout {
    --side-hd-height: 52px;
    --side-ft-height: 50px;
    --aside-width: 258px;
    --footer-height: 50px;
    --breadcrumb-height: 52px;
    --aside-folded-width: 60px;
    min-width: 1280px;
    height: calc(100vh - 52px);
    margin-top: 52px;
   .aside {
        position: relative;
        width: var(--aside-width);
        height: 100%;
        border-right: 1px solid #DCDEE5;
        background: #FFF;
        float: left;
        z-index: 1;
        transition: width .2s cubic-bezier(0.4, 0, 0.2, 1);

        .side-hd {
            height: var(--side-hd-height);
            line-height: var(--side-hd-height);
            display: flex;
            align-items: center;
            .back-icon {
                color: #3a84ff;
                padding: 10px;
                cursor: pointer;
            }
            .template-logo {
                margin: 0 10px;
                cursor: pointer;
                svg {
                    vertical-align: middle;
                }
            }
            .seperate-line {
                width: 1px;
                color: #d8d8d8;
                margin-left: -2px;
            }
            .select-project {
                width: 216px;
                border: none;
                margin-left: 2px;
                .bk-select-name {
                    font-size: 14px;
                    color: #313238;
                }
                &.is-focus {
                    box-shadow: none;
                }
            }
        }
        .side-bd {
            height: calc(100% - var(--side-hd-height) - var(--side-ft-height, 0px));
            overflow-y: auto;
        }
        .side-ft {
            position: absolute;
            bottom: 0;
            height: var(--side-ft-height);
            line-height: var(--side-ft-height);
            width: 100%;
            background: #fff;
            padding-left: 12px;

            .nav-toggle {
                width: 32px;
                height: 32px;
                line-height: 32px;
                cursor: pointer;
                display: inline-block;
                text-align: center;
                transform: rotate(180deg);
                transition: transform .2s cubic-bezier(0.4, 0, 0.2, 1);

                &:hover {
                    opacity: .8;
                }
            }
        }
        .no-click {
            pointer-events: none;
        }
    }
        .breadcrumbs {
            position: relative;
            z-index: 1;
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: var(--breadcrumb-height);
            background: #fff;
            box-shadow: 0px 2px 2px 0px rgba(0,0,0,0.1);
            padding-left: 24px;

            .page-top {
                display: flex;
                align-items: center;

                .version-selector {
                    margin-left: 25px;
                    position: relative;
                    display: flex;
                    align-items: center;
                    font-size: 12px;

                    &::before {
                        content: '|';
                        position: absolute;
                        left: -13px;
                        top: 50%;
                        transform: translateY(-50%);
                        color: #C4C6CC;
                    }

                    .project-version-selector {
                        max-width: 320px;
                    }
                }

                    .download-demo {
                        font-size: 12px;
                        line-height: 18px;
                        color: #3A84FF;
                        position: absolute;
                        right: 24px;
                        top: 18px;
                        .bk-icon-help {
                            font-size: 14px !important;
                        }
                    }

            }

            .current {
                color: #000;
                font-size: 16px;
                font-weight: normal;
            }
        }
    .main-container {
        height: calc(100% - var(--breadcrumb-height));
        overflow: auto;

        .exception-page {
            height: 100%;
            display: flex;
            align-items: center;
        }
    }
  }
</style>