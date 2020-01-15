import React, { useEffect, useState, useRef } from "react";
import * as three from "three";

import * as styles from "../../styles";
import { useSimpleDrag } from "../hooks";
import { Tree } from "../../splyt";
import create from "./splyt";
import * as utils from "./utils";

export interface Props {
  size: { width: number; height: number };
  canvasRef?: (node: HTMLCanvasElement | null) => void;
  tree: Tree;
  style?: any;
  activePath: string | null;
}

interface Bounds {
  minX: number;
  minY: number;
  minZ: number;
  maxX: number;
  maxY: number;
  maxZ: number;
}

const groupToBounds = (group: three.Group): Bounds => {
  const bounds = new three.Box3().setFromObject(group);
  return {
    minX: bounds.min.x,
    minY: bounds.min.y,
    minZ: bounds.min.z,
    maxX: bounds.max.x,
    maxY: bounds.max.y,
    maxZ: bounds.max.z
  };
};

const Splyt3dViewer: React.SFC<Props> = props => {
  const { size, canvasRef, tree, activePath, ...rest } = props;

  const containerEl = useRef(null);

  const { dragContainerAttrs, drag } = useSimpleDrag();

  const [scene] = useState<three.Scene>(createScene());

  const [appended, setAppended] = useState(false);

  const [camera] = useState<three.PerspectiveCamera>(
    (() => {
      const cam = new three.PerspectiveCamera(
        45,
        undefined, // Set subsequently in update
        10,
        10000
      );
      cam.up = new three.Vector3(0, -1, 0);
      cam.position.set(0, 300, 300);
      return cam;
    })()
  );

  const [renderer, setRenderer] = useState<three.Renderer | undefined>(
    undefined
  );

  useEffect(() => {
    const r = new three.WebGLRenderer({
      antialias: true,
      preserveDrawingBuffer: true
    });

    r.setClearColor(0xffffff, 1);
    r.shadowMap.enabled = true;

    const el = (r.domElement as any)

    el.style.opacity = 0;
    el.style.transition = "opacity 0.3s ease-in-out";

    setRenderer(r);
  }, []);

  const [obj, setObj] = useState<three.Group | undefined>(undefined);

  const [bounds, setBounds] = useState<Bounds | undefined>(undefined);

  useEffect(() => {
    if (obj) {
      scene.remove(obj);
    }
    const group = create(props.tree, {
      activePath: props.activePath
    });
    scene.add(group);
    setObj(group);
  }, [props.tree, props.activePath]);

  useEffect(() => {
    if (!obj) {
      return;
    }
    const newBounds = groupToBounds(obj);
    if (!bounds) {
      setBounds(newBounds);
      return;
    }
    const tween = utils.tweenOnce({
      start: bounds,
      end: newBounds,
      onChange: currentBounds => {
        setBounds(currentBounds);
      }
    });
    return () => {
      tween.stop();
    };
  }, [obj]);

  useEffect(() => {
    if (!renderer || !camera || !size) {
      return;
    }
    renderer.setSize(size.width, size.height);
    const maxAspect =
      size.width > size.height
        ? size.width / size.height
        : size.height / size.width;
    camera.aspect = size.width / size.height;
    if (!bounds) {
      return;
    }
    const boundsMin = new three.Vector3(bounds.minX, bounds.minY, bounds.minZ);
    const boundsMax = new three.Vector3(bounds.maxX, bounds.maxY, bounds.maxZ);
    const center = boundsMin
      .clone()
      .add(boundsMax)
      .multiplyScalar(0.5);
    const boundsDistance = boundsMin.distanceTo(boundsMax);
    const [cameraAngleXY, cameraAngleZ]: [number, number] = [
      drag[0] / 200,
      drag[1] / 200
    ];
    const cameraPosition = center
      .clone()
      .add(
        new three.Vector3(
          boundsDistance *
            maxAspect *
            Math.cos(cameraAngleZ) *
            Math.sin(cameraAngleXY),
          -boundsDistance * maxAspect * Math.sin(cameraAngleZ),
          boundsDistance *
            maxAspect *
            Math.cos(cameraAngleZ) *
            Math.cos(cameraAngleXY)
        )
      );
    camera.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z);
    camera.lookAt(center);
    camera.updateProjectionMatrix();
    renderer.render(scene, camera);
  }, [size, bounds, drag, camera, renderer, scene]);

  useEffect(() => {
    if (!containerEl || !renderer) {
      return;
    }
    const container = (containerEl.current as unknown) as HTMLElement;
    if (container && !appended) {
      container.appendChild(renderer.domElement);
      if (canvasRef) {
        canvasRef(renderer.domElement);
      }
      setAppended(true);
    }
  }, [containerEl, canvasRef, appended, renderer]);

  useEffect(() => {
    if (appended && renderer) {
      (renderer.domElement as any).style.opacity = 1;
    }
  }, [appended, renderer]);

  return (
    <div
      {...dragContainerAttrs}
      ref={containerEl}
      style={{ width: size.width, height: size.height }}
      {...rest}
    />
  );
};

const createScene = (): three.Scene => {
  /* Environment */

  const axisHelper = new three.AxesHelper(50);

  const planeGeometry = new three.CircleGeometry(50, 40);
  const planeMaterial = new three.MeshLambertMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 1,
    side: three.DoubleSide
  });

  const plane = new three.Mesh(planeGeometry, planeMaterial);
  plane.receiveShadow = true;
  plane.rotation.x = -Math.PI / 2;
  plane.position.set(0, 0, 0);

  /* Lights */

  const lights = (() => {
    const light1 = new three.DirectionalLight(styles.white, 0.2);
    light1.position.set(10, 10, 10);

    const light2 = new three.DirectionalLight(styles.white, 0.2);
    light2.position.set(-10, -10, -10);

    const light3 = new three.AmbientLight(styles.white);

    return [light1, light2, light3];
  })();

  /* Scene */

  const scene = new three.Scene();

  if (false && process.env.NODE_ENV === "development") {
    scene.add(axisHelper);
    scene.add(plane);
  }

  lights.forEach(light => {
    scene.add(light);
  });

  return scene;
};

export default Splyt3dViewer;
